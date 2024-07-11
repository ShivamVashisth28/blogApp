import z from 'zod';

export const singupInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
})
export type SignupInput = z.infer<typeof singupInput>



export const singinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
 })
export type SigninInput = z.infer<typeof singinInput>



export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});
export type CreatePostType = z.infer<typeof createPostInput>;



export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});
export type UpdatePostType = z.infer<typeof updatePostInput>;