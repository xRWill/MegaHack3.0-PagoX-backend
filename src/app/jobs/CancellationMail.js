import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { order } = data;

    await Mail.sendMail({
      to: `${order.provider.name} <${order.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: order.provider.name,
        user: order.user.name,
        date: format(parseISO(order.date), "dd 'de' MMMM', às ' H:mm'h", {
          locale: ptBR,
        }),
      },
    });
  }
}

export default new CancellationMail();
