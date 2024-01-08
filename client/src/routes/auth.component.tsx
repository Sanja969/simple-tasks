import UserForm from "../components/userForm.component";

export default function Login() {

  return (
    <div className="px-6 flex gap-6 justify-between w-full">
      <UserForm action='login' />
      <UserForm action='signup' />
    </div>

  )
}