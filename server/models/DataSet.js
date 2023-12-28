import mongoose from 'mongoose';

const dataSetSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
  soldCount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const DataSet = mongoose.model('DataSet', dataSetSchema);

export default DataSet;
