const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const receiverEmail = process.env.CONTACT_RECEIVER || 'goncaloaleluiamkt@gmail.com';
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE.toLowerCase() === 'true' : smtpPort === 465;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || 'Portfólio Gonçalo <goncaloaleluiamkt@gmail.com>';

const transportOptions = {
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
};

const transporter = nodemailer.createTransport(transportOptions);

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname)));

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';
  const trimmedSubject = typeof subject === 'string' ? subject.trim() : 'outro';

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return res.status(500).json({ error: 'Configuração do servidor de email em falta. Verifique o ficheiro .env.' });
  }

  const subjectMap = {
    projeto: 'Novo Projeto',
    estagio: 'Estágio / Oportunidade',
    academico: 'Colaboração Académica',
    outro: 'Outro Assunto',
  };

  const subjectLabel = subjectMap[trimmedSubject] || 'Contacto via formulário';
  const mailOptions = {
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
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Mensagem enviada com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Erro interno ao enviar a mensagem. Tente novamente mais tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`API de contacto a correr em http://localhost:${PORT}`);
  console.log(`Enviar emails para: ${receiverEmail}`);
});
