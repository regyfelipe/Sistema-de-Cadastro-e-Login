const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require('jsonwebtoken');

const sendEmail = require("../services/emailService");

exports.registerUser = async (req, res) => {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let avatarUrl = null;
        if (avatar) {
            const buffer = Buffer.from(avatar.split(',')[1], 'base64');
            const avatarName = `${Date.now()}-avatar.webp`;
            const avatarPath = path.join(__dirname, '..', 'uploads', 'avatars', avatarName);

            await sharp(buffer)
                .resize(200, 200)
                .webp({ quality: 85 })
                .toFile(avatarPath);

            avatarUrl = `/uploads/avatars/${avatarName}`;
        }

        const newUser = await User.create({ name, email, password: hashedPassword, avatar: avatarUrl });

        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            user: newUser,
            success: true
        });

        const subject = "Cadastro realizado com sucesso!";
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2c3e50;">Bem-vindo ao Sistema Sertao Concurseiro, ${name}!</h2>
        <p>Parabéns! Seu cadastro foi realizado com sucesso em nosso sistema.</p>
        <p>Agora você pode acessar todos os nossos recursos e iniciar sua jornada de estudos!</p>
        
        <h3 style="color: #2c3e50;">O que fazer agora?</h3>
        <ul>
          <li>Acesse sua conta a qualquer momento.</li>
          <li>Explore nossos cursos e materiais de estudo.</li>
          <li>Entre em contato conosco para qualquer dúvida.</li>
        </ul>

        <p>Se você tiver qualquer dúvida ou precisar de ajuda, não hesite em entrar em contato conosco. Estamos aqui para ajudar!</p>
        
        <p style="font-size: 12px; color: #7f8c8d;">
          Atenciosamente,<br>
          <strong>Equipe Concurseiro</strong><br>
          <a href="mailto:support@sertaoconcurseiro.com" style="color: #3498db;">support@sertaoconcurseiro.com</a><br>
          <a href="http://www.sertaoconcurseiro.com" style="color: #3498db;">www.sertaoconcurseiro.com</a>
        </p>
      </div>
        `;
        sendEmail(email, subject, "Cadastro realizado com sucesso!", html);

    } catch (error) {
        if (avatarUrl) {
            try {
                fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'avatars', avatarUrl));
            } catch (deleteError) {
                console.error("Erro ao excluir avatar após falha:", deleteError);
            }
        }

        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ error: "Erro ao cadastrar usuário.", success: false });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    try {
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(400).json({ error: "Usuário não encontrado." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Senha incorreta." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
            user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar }
        });

    } catch (error) {
        console.error("Erro ao realizar login:", error);
        res.status(500).json({ error: "Erro ao fazer login." });
    }
};


exports.getUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.json({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        res.status(500).json({ error: "Erro ao buscar dados do usuário." });
    }
};