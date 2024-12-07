"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./controller/user.controller");
const user_service_1 = require("./service/user.service");
const user_repository_1 = require("./repository/user.repository");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const url_controller_1 = require("./controller/url.controller");
const url_service_1 = require("./service/url.service");
const url_repository_1 = require("./repository/url.repository");
const url_schema_1 = require("./schema/url.schema");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (ConfigService) => ({
                    global: true,
                    secret: ConfigService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: ConfigService.get('JWT_EXPIRATION'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'Url', schema: url_schema_1.UrlSchema },
            ]),
        ],
        controllers: [user_controller_1.UserController, url_controller_1.UrlController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, url_service_1.UrlService, url_repository_1.UrlRepository]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map