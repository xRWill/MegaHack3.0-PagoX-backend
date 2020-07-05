import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import File from '../models/File';
import Order from '../models/Order';

class ScheduleController {
  async index(req, res) {
    const { page = 1, date = new Date() } = req.query;

    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });
    if (!checkUserProvider) {
      return res.status(400).json({ error: 'User is not a provider.' });
    }

    const parsedDate = parseISO(date);
    const orders = await Order.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: { [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)] },
      },
      limit: 20,
      offset: (page - 1) * 20,
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: [{ model: File, as: 'avatar', attributes: ['path', 'url'] }],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new ScheduleController();
