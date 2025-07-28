import StyledInput from '@components/forms/StyledInput';
import StyledButton from '@components/StyledButton';
import StyledLink from '@components/StyledLink';
import useLogin from './_hooks/useLogin';

export function LoginPage() {
  const { isLoading, errors, handleSubmit, register } = useLogin();
  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <h1 className="text-center text-2xl font-semibold">Login</h1>
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {errors.root && <p className="text-center text-red-500">{errors.root.message}</p>}

      <StyledInput
        type="text"
        {...register('email')}
        errors={errors.email?.message}
        label="E-mail"
        placeholder="youremail@example.com"
      />
      <StyledInput
        type="password"
        {...register('password')}
        errors={errors.password?.message}
        label="Password"
        placeholder="**********"
      />

      <StyledButton type="submit" variant="primary">
        Login
      </StyledButton>
      <StyledLink to="/register">You don't have an account?</StyledLink>
    </form>
  );
}
