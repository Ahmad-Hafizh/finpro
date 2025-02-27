"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = exports.passwordSchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(4, { message: 'must be more than 4 characters' }).max(150, { message: 'must be less than 150 characters' }),
    email: zod_1.z.string().email({ message: 'email is not correct' }),
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'email is not correct' }),
    password: zod_1.z.string().min(8, { message: 'Must be more than 8 character' }).max(50, { message: 'must be less than 50 character' }),
});
exports.passwordSchema = zod_1.z.object({
    password: zod_1.z.string().min(8, { message: 'Must be more than 8 character' }).max(50, { message: 'must be less than 50 character' }),
    confirmPassword: zod_1.z.string(),
});
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(4, { message: 'must be more than 4 characters' }).max(150, { message: 'must be less than 150 characters' }),
    email: zod_1.z.string().email({ message: 'email is not correct' }),
    phone: zod_1.z.string().max(25, { message: 'must be less than 15 characters' }).optional(),
});
