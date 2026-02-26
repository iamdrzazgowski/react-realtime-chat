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
import { useForm } from 'react-hook-form';
import chatting from '@/assets/chatting.svg';
import FormErrorLabel from './ui/form-error';
import type { SignUpFormValues } from '@/types/form';
import { useRegisterUser } from '@/hooks/useAuth';

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm<SignUpFormValues>();
    const { registerUser, isLoading } = useRegisterUser();

    const onSubmit = ({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    }: SignUpFormValues) => {
        registerUser(
            {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            },
            { onSettled: () => reset() },
        );
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
                                    Create your account
                                </h1>
                                <p className='text-muted-foreground text-sm text-balance'>
                                    Enter your email below to create your
                                    account
                                </p>
                            </div>
                            <Field>
                                <Field className='grid grid-cols-2 gap-4'>
                                    <Field>
                                        <FieldLabel htmlFor='firstName'>
                                            First Name
                                        </FieldLabel>
                                        <Input
                                            id='firstName'
                                            type='text'
                                            {...register('firstName', {
                                                required:
                                                    'This field is required',
                                            })}
                                            className={`${
                                                errors.firstName?.message
                                                    ? 'border-red-500'
                                                    : ''
                                            }`}
                                        />
                                        <FormErrorLabel
                                            error={errors.firstName?.message}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor='lastName'>
                                            Last Name
                                        </FieldLabel>
                                        <Input
                                            id='lastName'
                                            type='text'
                                            {...register('lastName', {
                                                required:
                                                    'This field is required',
                                            })}
                                            className={`${
                                                errors.lastName?.message
                                                    ? 'border-red-500'
                                                    : ''
                                            }`}
                                        />
                                        <FormErrorLabel
                                            error={errors.lastName?.message}
                                        />
                                    </Field>
                                </Field>
                            </Field>
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
                                <Field className='grid grid-cols-2 gap-4'>
                                    <Field>
                                        <FieldLabel htmlFor='password'>
                                            Password
                                        </FieldLabel>
                                        <Input
                                            id='password'
                                            type='password'
                                            {...register('password', {
                                                required:
                                                    'This field is required',
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        'Password needs a minimum of 8 characters',
                                                },
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
                                        <FieldLabel htmlFor='confirmPassword'>
                                            Confirm Password
                                        </FieldLabel>
                                        <Input
                                            id='confirmPassword'
                                            type='password'
                                            {...register('confirmPassword', {
                                                required:
                                                    'This field is required',
                                                validate: (value) =>
                                                    value ===
                                                        getValues().password ||
                                                    'Passwords need to match',
                                            })}
                                            className={`${
                                                errors.confirmPassword?.message
                                                    ? 'border-red-500'
                                                    : ''
                                            }`}
                                        />
                                        <FormErrorLabel
                                            error={
                                                errors.confirmPassword?.message
                                            }
                                        />
                                    </Field>
                                </Field>
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <Button type='submit' disabled={isLoading}>
                                    Create Account
                                </Button>
                            </Field>
                            <FieldDescription className='text-center'>
                                Already have an account?{' '}
                                <a href='/login'>Sign in</a>
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
