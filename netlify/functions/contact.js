const nodemailer = require('nodemailer');

const receiverEmail = process.env.CONTACT_RECEIVER || 'goncaloaleluiamkt@gmail.com';
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE.toLowerCase() === 'true'
  : smtpPort === 465;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || 'Portfólio Gonçalo <goncaloaleluiamkt@gmail.com>';

const subjectMap = {
  projeto: 'Novo Projeto',
  estagio: 'Estágio / Oportunidade',
  academico: 'Colaboração Académica',
  outro: 'Outro Assunto',
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método não permitido.' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Pedido inválido.' }) };
  }

  const { name, email, subject, message } = body;
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';
  const trimmedSubject = typeof subject === 'string' ? subject.trim() : 'outro';

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Por favor, preencha todos os campos obrigatórios.' }),
    };
  }

  if (!smtpHost || !smtpUser || !smtpPass) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Configuração do servidor de email em falta.' }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const subjectLabel = subjectMap[trimmedSubject] || 'Contacto via formulário';

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: receiverEmail,
      replyTo: trimmedEmail,
      subject: `Mensagem do portfólio: ${subjectLabel}`,
      html: `
        <p><strong>Nome:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Assunto:</strong> ${subjectLabel}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${trimmedMessage.replace(/\n/g, '<br />')}</p>
      `,
    });
    return { statusCode: 200, body: JSON.stringify({ message: 'Mensagem enviada com sucesso.' }) };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno ao enviar a mensagem. Tente novamente mais tarde.' }),
    };
  }
};
