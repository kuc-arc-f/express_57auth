const { PrismaClient } = require('@prisma/client')
//import LibCsrf from "./LibCsrf"
import LibConfig from './LibConfig';

const  LibTask = {
  getItems :async function(){
    try {
      console.log("tasks");
      const prisma = new PrismaClient()
      const items = await prisma.task.findMany({
        orderBy: { id: 'desc',},
      })
      await prisma.$disconnect()
//      console.log(items);
      return items      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems');
    }          
  },    
  getTask :async function(id: number){
  },
  addTask :async function(req: any){
    try {
//console.log(LibConfig.OK_CODE);
//console.log(req.body);
      const body = req.body;
      const prisma = new PrismaClient();
      const result = await prisma.task.create({
        data: {
          title: body.title,
          userId: 0
        }
      }) 
      await prisma.$disconnect()
      console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result 
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTask: '+ err);
    }    
  },
  updateTask :async function(args: any){
  },  
  deleteTask :async function(args: any){
  },             
}
export default LibTask;
