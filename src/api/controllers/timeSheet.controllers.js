const moment = require("moment/moment")
const allowanceModel = require("../models/allowance.model")
const { count } = require("../models/department.model")
const { populate } = require("../models/personnel.model")
const personnelModel = require("../models/personnel.model")
const personnelBonusModel = require("../models/personnelBonus.model")
const personnelFineModel = require("../models/personnelFine.model")
const salaryModel = require("../models/salary.model")
const timeSheetModel = require("../models/timeSheet.model")
const { parse } = require("json2csv");
const { exportExcel } = require("../helper/exportExcel");
const sendMail = require("../helper/sendMail")
const personnelDayOffModel = require("../models/personnelDayOff.model")


const createTimeSheetMany = async (req, res) => {
  try {
    const data = req.body
    const workingDay = data.workingDay
    const start = moment(workingDay).startOf('day');
    const end = moment(workingDay).endOf('day');
    const lisTimeSheet = await timeSheetModel.find({ workingDay: { $gte: start, $lte: end } }).populate('personnel')
    if (lisTimeSheet.length === 0) {
      const listPersonnel = await personnelModel.find()
      const data = listPersonnel.map((item) => {
        return { personnel: item._id, workingDay: workingDay, status: 1 }
      })
      await timeSheetModel.insertMany(data)
      const timeSheets = await timeSheetModel.find({ workingDay: { $gte: start, $lte: end } }).populate('personnel')
      return res.status(200).json({ data: timeSheets, description: `Create TimeSheet ${moment(workingDay).format('DD/MM/YYYY')} Success` })
    }
    else {
      return res.status(200).json({ data: lisTimeSheet, description: `time attendance data on ${moment(workingDay).format('DD/MM/YYYY')} was created before` })
    }
  } catch (error) {
    return res.status(403).json(error)
  }
}

const createTimeSheet = async (req, res) => {
  try {
    const start = moment().startOf('day')
    const end = moment().endOf('day')
    const data = req.body
    const time = moment().hour();
    const timeSheets = await timeSheetModel.find({ createdAt: { $gte: start, $lte: end }, personnel: data.personnel })
    if (timeSheets.length === 0) {
      const timeSheet = await timeSheetModel.create({ ...data })
      return res.status(200).json({ data: timeSheet, description: "Chấm công thành công!" })
    }
    else if (timeSheets.length === 1) {
      const timeSheet = await timeSheetModel.create({ ...data })
      return res.status(200).json({ data: timeSheet, description: "Chấm công thành công!" })
    }
    else {
      return res.status(200).json({ description: "Đã hoàn thành chấm công!" })
    }
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getListPersonnelTimeSheet = async (req, res) => {
  try {
    const data = req.query
    const start = moment().startOf('day');
    const end = moment().endOf('day');
    const timeSheets = await timeSheetModel.find({ createdAt: { $gte: start, $lte: end }, personnel: data.personnel }).populate('personnel')
    return res.status(200).json({ data: timeSheets })
  } catch (error) {
    console.log(error)
    return res.status(403).json(error)
  }
}
const updateTimeSheet = async (req, res) => {
  try {
    const data = req.body
    await timeSheetModel.findByIdAndUpdate({ _id: data._id }, { status: data.status, updatedAt: Date.now() })
    const timeSheet = await timeSheetModel.findOne({ _id: data._id })
    return res.status(200).json({ data: timeSheet, description: 'Update TimeSheet Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const deleteTimeSheet = async (req, res) => {
  const ids = req.body.ids
  try {
    await timeSheetModel.deleteMany({ _id: { $in: ids } })
    return res.status(200).json({ description: "Delete TimeSheet Succes" })
  } catch (error) {
    return res.status(403).json(error)
  }
}
const getTimeSheet = async (req, res) => {
  const _id = req.params.id
  try {
    const timeSheet = await timeSheetModel.findOne({ _id }).populate('personnel')
    return res.status(200).json({ data: timeSheet, description: "Fetching TimeSheet Success" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const getListTimeSheet = async (req, res) => {
  try {
    const { limit, page } = req.query
    const query = { ...req.query }
    const excludedFields = ["page", "sort", "limit", "fields"]
    excludedFields.forEach((e) => delete query[e])
    if (query.createdAt) {
      const start = moment(query.createdAt).startOf('day');
      const end = moment(query.createdAt).endOf('day');
      query['createdAt'] = { $gte: start, $lte: end }
    }
    timeSheetModel.find({ ...query }).populate({ path: 'personnel', match: { name: new RegExp(req.query.name, 'i'), email: new RegExp(req.query.email, 'i') } }).skip(limit * page - limit).limit(limit).sort([['createdAt', -1]]).exec((err, timeSheets) => {
      timeSheetModel.countDocuments((err, count) => {
        const listTimeSheet = timeSheets.filter((item) => item.personnel !== null)
        return res.status(200).json({ list: listTimeSheet, total: count, description: "Fetching List TimeSheet Succes" })
      })
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const summaryOfWorkingDays = async (req, res) => {
  try {
    const day = req.query.day;
    const start = moment(day).startOf('month');
    const end = moment(day).endOf('month');
    const listPersonnel = await personnelModel.find({ name: new RegExp(req.query.name, 'i'), email: new RegExp(req.query.email, 'i') }).populate('rank')
    const listSum = []
    async function publicity(data) {
      for (const item of data) {
        const listDayOff = await personnelDayOffModel.find({ personnel: item._id, dayOff: { $gte: start, $lte: end } })
        let sumDayOff = 0
        listDayOff.forEach((item1) => {
          sumDayOff = sumDayOff + Math.abs(item1.status)
        })
        const list = await timeSheetModel.find({ personnel: item._id, createdAt: { $gte: start, $lte: end } })
        listSum.push({ name: item.name, email: item.email, count: list.length / 2, sumDayOff: sumDayOff })
      }
    }
    await publicity(listPersonnel)
    return res.status(200).json({ list: listSum, description: 'Fetching List TimeSheet Succes' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const exportExcelTimeSheet = async (req, res) => {
  const { limit, page, keyword, day } = req.query
  try {
    const start = moment(day).startOf('month');
    const end = moment(day).endOf('month');
    const listPersonnel = await personnelModel.find({}).populate('rank')
    const listSum = []
    async function publicity(data) {
      for (const item of data) {
        const list = await timeSheetModel.find({ personnel: item._id, createdAt: { $gte: start, $lte: end } })
        listSum.push({ name: item.name, email: item.email, count: list.length / 2 })
      }
    }
    await publicity(listPersonnel)
    const fields = [
      "name",
      "email",
      "count",
    ];
    const csv = exportExcel(fields, listSum)
    return res.attachment(`Bang_Cong_Thang_${moment(day).format('MM')}.xlsx`).send(csv)
  } catch (error) {
    return res.status(403).json(error)
  }
}

const summaryOfSalary = async (req, res) => {
  try {
    const day = req.query.day;
    const sumWorkingDay = req.query.sumWorkingDay
    const start = moment(day).startOf('month');
    const end = moment(day).endOf('month');
    const listPersonnel = await personnelModel.find({ name: new RegExp(req.query.name, 'i'), email: new RegExp(req.query.email, 'i') }).populate('rank')
    const listSum = []
    async function publicity(data) {
      for (const item of data) {
        let sum = 0
        let sumBonus = 0
        let sumFine = 0
        let sumAllowance = 0
        let sumDayOff = 0
        const data = await Promise.all([timeSheetModel.find({ personnel: item._id, createdAt: { $gte: start, $lte: end } }), allowanceModel.find(), personnelFineModel.find({ personnel: item._id, createdAt: { $gte: start, $lte: end } }).populate('fine'), personnelBonusModel.find({ personnel: item._id, createdAt: { $gte: start, $lte: end } }).populate('bonus'), personnelDayOffModel.find({ personnel: item._id, dayOff: { $gte: start, $lte: end } })])
        const list = data[0]
        const allowances = data[1]
        const fines = data[2]
        const bonus = data[3]
        const listDayOff = data[4]
        allowances.forEach((item) => {
          sumAllowance = + Number(item.value)
        })
        listDayOff.forEach((item1) => {
          sumDayOff = sumDayOff + Math.abs(item1.status)
        })
        listFine = fines.map((item) => {
          return item.fine
        })
        listBonus = bonus.map((item) => {
          return item.bonus
        })
        listFine.forEach(element => {
          sumFine = + Number(element.value)
        });
        listBonus.forEach(element => {
          sumBonus = + Number(element.value)
        });
        if (list.length / 2 < 10) {
          sumAllowance = 0
        }
        sum = (item.rank.value / sumWorkingDay * (list.length / 2 + sumDayOff) + sumBonus - sumFine + sumAllowance) - (item.rank.value / sumWorkingDay * list.length / 2 + sumBonus - sumFine + sumAllowance) * 10.5 / 100
        listSum.push({ name: item.name, email: item.email, count: (list.length / 2), sumDayOff: sumDayOff, listFine: [...listFine], listBonus: [...listBonus], salary: sum.toFixed(), salary1: (item.rank.value / sumWorkingDay * (list.length / 2 + sumDayOff)).toFixed() })
      }
    }
    await publicity(listPersonnel)
    await salaryModel.findOneAndDelete({ time: { $gte: start, $lte: end } })
    await salaryModel.create({ data: listSum, time: day })
    return res.status(200).json({ list: listSum, description: 'Fetching List Salary And Save Success' })
  } catch (error) {
    return res.status(403).json(error)
  }
}

const exportExcelSummaryOfSalary = async (req, res) => {
  try {
    const day = req.query.day;
    const sumWorkingDay = req.query.sumWorkingDay
    const start = moment(day).startOf('month');
    const end = moment(day).endOf('month');
    const listPersonnel = await personnelModel.find({}).populate('rank')
    const listSum = []
    async function publicity(data) {
      for (const item of data) {
        let sum = 0
        let sumBonus = 0
        let sumFine = 0
        let sumAllowance = 0
        const data = await Promise.all([timeSheetModel.find({ personnel: item._id, createdAt: { $gte: start, $lte: end } }), allowanceModel.find(), personnelFineModel.find({ personnel: item._id, createdAt: { $gte: start, $lte: end } }).populate('fine'), personnelBonusModel.find({ personnel: item._id, createdAt: { $gte: start, $lte: end } }).populate('bonus')])
        const list = data[0]
        const allowances = data[1]
        const fines = data[2]
        const bonus = data[3]
        allowances.forEach((item) => {
          sumAllowance = + Number(item.value)
        })
        listFine = fines.map((item) => {
          return item.fine
        })
        listBonus = bonus.map((item) => {
          return item.bonus
        })
        listFine.forEach(element => {
          sumFine = + Number(element.value)
        });
        listBonus.forEach(element => {
          sumBonus = + Number(element.value)
        });
        if (list.length / 2 < 10) {
          sumAllowance = 0
        }
        sum = item.rank.value / sumWorkingDay * list.length / 2 + sumBonus - sumFine + sumAllowance
        listSum.push({ name: item.name, email: item.email, count: list.length / 2, listFine: [...listFine], listBonus: [...listBonus], salary: sum.toFixed() })
      }
    }
    await publicity(listPersonnel)
    const fields = [
      "name",
      "email",
      "count",
      "salary",
    ];
    const csv = exportExcel(fields, listSum)
    return res.attachment(`Bang_Luong_Thang_${moment(day).format('MM')}.xlsx`).send(csv)
  } catch (error) {
    return res.status(403).json(error)
  }
}
const sendMailSalary = async (req, res) => {
  try {
    await sendMail(req.query)
    return res.status(200).json({ description: "Gửi mail thành công!" })
  } catch (error) {
    return res.status(403).json(error)
  }
}

module.exports = { createTimeSheetMany, updateTimeSheet, deleteTimeSheet, getTimeSheet, getListTimeSheet, getListPersonnelTimeSheet, createTimeSheet, summaryOfWorkingDays, summaryOfSalary, exportExcelTimeSheet, exportExcelSummaryOfSalary, sendMailSalary }