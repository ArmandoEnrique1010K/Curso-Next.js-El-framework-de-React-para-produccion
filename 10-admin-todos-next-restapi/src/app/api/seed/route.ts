import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {

    await prisma.todo.deleteMany();

    // const todo = await prisma.todo.create({
    //     data: {
    //         description: 'Piedra del alma', complete: true,
    //     }
    // })
    // console.log(todo);

    await prisma.todo.createMany({
        data: [
            { description: 'Piedra del alma', complete: true },
            { description: 'Piedra del poder', complete: true },
            { description: 'Piedra del tiempo', complete: true },
            { description: 'Piedra del espacio', complete: true },
            { description: 'Piedra de la realidad', complete: true },
            { description: 'Piedra desconocida' }
        ]
    })

    return NextResponse.json({
        message: 'Seed executed',
    })
}
