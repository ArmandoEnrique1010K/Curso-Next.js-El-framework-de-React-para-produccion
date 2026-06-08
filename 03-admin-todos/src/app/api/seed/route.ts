import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

    await prisma.todo.deleteMany(); // delete * from todo
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'test1@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'client', 'super-user'],
            todos: {
                create: [
                    { description: 'Piedra del alma', complete: true },
                    { description: 'Piedra del poder', complete: true },
                    { description: 'Piedra del tiempo', complete: true },
                    { description: 'Piedra del espacio', complete: true },
                    { description: 'Piedra de la realidad', complete: true },
                ]
            }
        }
    })
    // const todo = await prisma.todo.create({
    //     data: {
    //         description: 'Piedra del alma', complete: true,
    //     }
    // })
    // console.log(todo);

    // await prisma.todo.createMany({
    //     data: [
    //         { description: 'Piedra del alma', complete: true },
    //         { description: 'Piedra del poder', complete: true },
    //         { description: 'Piedra del tiempo', complete: true },
    //         { description: 'Piedra del espacio', complete: true },
    //         { description: 'Piedra de la realidad', complete: true },
    //         { description: 'Piedra desconocida' }
    //     ]
    // })

    

    return NextResponse.json({
        message: 'Seed executed',
    })
}
