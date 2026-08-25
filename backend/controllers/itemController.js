const Item = require('../models/Item');

// @desc    Get items with pagination, search, filtering, sorting
// @route   GET /api/items
const getItems = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
    const { search, category, status, sortBy, sortOrder } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    const allowedSortFields = ['price', 'createdAt', 'title'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    const [items, count] = await Promise.all([
      Item.find(filter)
        .sort({ [sortField]: sortDirection })
        .skip((page - 1) * limit)
        .limit(limit),
      Item.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

// @desc    Create item
// @route   POST /api/items
const createItem = async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
const updateItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, item: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
