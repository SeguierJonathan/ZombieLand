import { User } from "../models/index.js";
import argon2 from "argon2";

export async function up() {

    const password = await argon2.hash("Admin@123456");

    await User.update({ password: password }, {
        where: {
            lastName: "seguier"
        }
    }

    );

    await User.update({ password: password }, {
        where: {
            lastName: "buffa"
        }
    }

    );

    await User.update({ password: password }, {
        where: {
            lastName: "delporte"
        }
    }

    );

}

