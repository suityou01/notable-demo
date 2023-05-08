import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const todos = await prisma.todos.findMany();
    context.res = {
        body: todos
    };
};

export default httpTrigger;