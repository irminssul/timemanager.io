<?php session_start(); /* Starts the session */

	/* Check Login form submitted */
	if(isset($_POST['Submit'])){



		/* Define username and associated password array */
		$logins = array(
      'demo' => 'demo',
      'username1' => 'password1',
      'username2' => 'password2'
    );



		/* Check and assign submitted Username and Password to new variable */
		$Username = isset($_POST['Username']) ? $_POST['Username'] : '';
		$Password = isset($_POST['Password']) ? $_POST['Password'] : '';

		/* Check Username and Password existence in defined array */
		if (isset($logins[$Username]) && $logins[$Username] == $Password){
			/* Success: Set session variables and redirect to Protected page  */
			$_SESSION['UserData']['Username']=$logins[$Username];
			header("location:index.php");
			exit;
		} else {
			/*Unsuccessful attempt: Set error message */
			$msg="<span style='color:red'>Invalid Login Details</span>";
		}
	}
?>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Вход в личный кабинет</title>
    <link type="text/css" href="css/style.css" rel="stylesheet">
    <link type="text/css" href="css/login.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <section id="content">
        <form action="" method="post">
          <h1>Личный кабинет</h1>
          <div>
            <input type="text" placeholder="Имя пользователя" required="" name="Username" id="username" />
          </div>
          <div>
            <input type="password" placeholder="Пароль" required="" name="Password" id="password" />
          </div>
          <div>
            <input type="submit" name="Submit" value="Войти" />
          </div>
        </form><!-- form -->
        <?php if(isset($msg)){?>
        <div class="button"><?php echo $msg;?></div><!-- button -->
        <?php } ?>
      </section><!-- content -->
    </div><!-- container -->
  </body>
</html>
