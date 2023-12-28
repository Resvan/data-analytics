import mongoose from 'mongoose';
import DataSet from '../models/DataSet.js';

export const addData = async (req, res) => {
  try {
    const { date, totalProductsCount, soldCount } = req.body;

    const newData = new DataSet({
      date,
      totalCount:totalProductsCount,
      soldCount,
      user: req.user.id,
    });

    await newData.save();

    res.status(201).json({message: 'Data added successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export const getData = async (req, res) => {
  try {
    const { year } = req.query;


    if (!year || isNaN(parseInt(year))) {
      return res.status(400).json({ error: 'Invalid or missing year parameter' });
    }

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const data = await DataSet.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$totalCount' },
          sold: { $sum: '$soldCount' },
        },
      },
      {
        $project: {
          _id: 0, 
          id: '$_id',
          data: {
            total: '$total',
            sold: '$sold',
          },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getUniqueYears = async (req, res) => {
  try {
    const uniqueYears = await DataSet.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: {
            $year: {
              $toDate: '$date',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id',
        },
      },
    ]);

    res.status(200).json(uniqueYears.map((yearObj) => yearObj.year));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};