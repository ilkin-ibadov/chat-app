import crypto from 'crypto'
const key = crypto.scryptSync(process.env.SECRET || 'default_password', 'salt', 32);
const iv = Buffer.alloc(16, 0);

export const encrypt = (text) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
}

export const decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
}