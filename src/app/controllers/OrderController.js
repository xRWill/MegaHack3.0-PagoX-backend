import * as Yup from 'yup';

// import Queue from '../../lib/Queue';
// import Notification from '../schemas/Notification';

// import CancellationMail from '../jobs/CancellationMail';

import User from '../models/User';

import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const orders = await Order.findAll({
      where: {
        user_id: req.userId,
      },
      limit: 20,
      offset: (page - 1) * 20,
      order: ['created_at'],
      attributes: ['id', 'product', 'value', 'description', 'due_date'],
      // include: [
      //   {
      //     model: User,
      //     as: 'provider',
      //     attributes: ['id', 'name'],
      //     include: [{ model: File, as: 'avatar', attributes: ['path', 'url'] }],
      //   },
      // ],
    });
    // console.log(orders);
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      description: Yup.string(),
      value: Yup.number().required(),
      due_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { product, description, value, due_date } = req.body;

    const order = await Order.create({
      user_id: req.userId,
      product,
      description,
      value,
      due_date,
    });
    // console.log('Ordem Criada: ', order);
    /**
     * Notify order provider
     */
    // const user = await User.findByPk(req.userId);
    // await Notification.create({
    //   content: `Novo pedido de ${user.name}, "${product}" por "${value}".`,
    //   // user: provider_id,// usuario a notificar-vendedor
    // });
    return res.json(order);
  }

  /**
   * Cancel an order
   */
  async delete(req, res) {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: User, as: 'user', attributes: ['name'] }],
    });
    if (order.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this order.",
      });
    }

    order.canceled_at = new Date();
    await order.save();
    // Queue.add(CancellationMail.key, { order }); // talvez ?
    return res.json(order);
  }
}

export default new OrderController();
