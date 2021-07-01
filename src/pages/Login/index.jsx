import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/firebase_context";
import {
  Layout,
  Form,
  ErrorMessage,
  Input,
  Button,
  Title,
  FirebaseError,
} from "./styles";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { login } = useAuth();

  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.user, data.password);
      history.push("/");
    } catch (e) {
      const error = handleFirebaseError(e.code);
      setFirebaseError(error);
      setLoading(false);
      reset();
    }
  };

  const [firebaseError, setFirebaseError] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {firebaseError && <FirebaseError>{firebaseError}</FirebaseError>}
        <Title>Login</Title>
        <Input
          type="text"
          placeholder="email@email.com"
          name="user"
          {...register("user", { required: true, maxLength: 80 })}
        />
        {errors.user && (
          <ErrorMessage>Preencha o campo corretamente</ErrorMessage>
        )}
        <Input
          type="password"
          placeholder="senha"
          name="password"
          {...register("password", { required: true, maxLength: 100 })}
        />
        {errors.password && (
          <ErrorMessage>Preencha o campo corretamente</ErrorMessage>
        )}
        <Button type="submit" disabled={loading} value="Logar"/>
      </Form>
    </Layout>
  );
}

export default App;

function handleFirebaseError(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Email inválido.";
    case "auth/wrong-password":
      return "Senha inválida.";
    case "auth/user-not-found":
      return "Não existe uma conta com esse email.";
    default:
      return "Algo deu errado.";
  }
}
