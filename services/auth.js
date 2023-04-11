const login = async (username, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigation.navigate(routes.HOME);
    })
    .catch((error) => {
      console.log(error);
      if (error.code === "auth/invalid-email") setError(error.message);
      else if (error.code === "auth/user-not-found") setError("No User Found");
      else {
        setError("Please check your email id or password");
      }
    });
};
