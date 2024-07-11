import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createPostInput, updatePostInput} from '@svashisth/medium-common'

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL : string
      JWT_SECRET: string,
    },
  
    Variables:{
      userId:String
    }
  }>();

blogRouter.use(async (c,next)=>{
    const jwt = c.req.header('authorization') || "";  
    if(!jwt){
       c.status(404);
       return c.json({error:"Authorization failed"});
    }

    // const token = jwt.split(' ')[1];
    try {
        const payload:any = await verify(jwt,c.env.JWT_SECRET);

        if(payload){
            c.set('userId',payload.id);
            await next();
        }else{
            c.status(401);
            return c.json({ error: "unauthorized (Payload empty)" });
        }

        
    } catch (error) {
        c.status(401);
        return c.json({ error: error});
    }
    

    

})

blogRouter.post('/', async (c)=>{
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const {success} = createPostInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:"inputs not correct"
        })
    } 

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: String(userId)
		}
	});
	return c.json({
		id: post.id
	});
} )

blogRouter.put('/', async (c)=>{
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const {success} = updatePostInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:"inputs not correct"
        })
    } 
    
	prisma.post.update({
		where: {
			id: body.id,
			authorId: String(userId)
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
} )

blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }   
        }
    });

	return c.json(posts); 
})


blogRouter.get('/:id', async (c)=>{
    const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		},
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }

	});

	return c.json(post);
})

