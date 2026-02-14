import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import chatting from '@/assets/chatting.svg';
import { useForm } from 'react-hook-form';
import FormErrorLabel from './ui/form-error';
import type { LoginFormValues } from '@/types/form';

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const onSubmit = () => {
        console.log('XD');
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card className='overflow-hidden p-0'>
                <CardContent className='grid p-0 md:grid-cols-2'>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='p-6 md:p-8'>
                        <FieldGroup>
                            <div className='flex flex-col items-center gap-2 text-center'>
                                <h1 className='text-2xl font-bold'>
                                    Welcome back
                                </h1>
                                <p className='text-muted-foreground text-balance'>
                                    Login to your Acme Inc account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor='email'>Email</FieldLabel>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='m@example.com'
                                    {...register('email', {
                                        required: 'This field is required',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message:
                                                'Please provide a valid email address',
                                        },
                                    })}
                                    className={`${
                                        errors.email?.message
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                />
                                <FormErrorLabel error={errors.email?.message} />
                            </Field>
                            <Field>
                                <div className='flex items-center'>
                                    <FieldLabel htmlFor='password'>
                                        Password
                                    </FieldLabel>
                                </div>
                                <Input
                                    id='password'
                                    type='password'
                                    {...register('password', {
                                        required: 'This field is required',
                                    })}
                                    className={`${
                                        errors.password?.message
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                />
                                <FormErrorLabel
                                    error={errors.password?.message}
                                />
                            </Field>
                            <Field>
                                <Button type='submit'>Login</Button>
                            </Field>

                            <FieldDescription className='text-center'>
                                Don&apos;t have an account?{' '}
                                <a href='/signup'>Sign up</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                    <div className='bg-muted relative hidden md:block'>
                        <img
                            src={chatting}
                            alt='Image'
                            className='absolute inset-0 h-full w-full object-contain object-center px-8 dark:brightness-[0.2] dark:grayscale'
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
