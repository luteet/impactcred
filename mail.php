<?php 
	
	// Переменные

	$companyName = $_POST['company-name'];
	$firstName = $_POST['first-name'];
	$lastName = $_POST['last-name'];
	$email = $_POST['email'];
	$companyWebsite = $_POST['company-website'];
	$city = $_POST['city'];
	$country = $_POST['country'];

	// Переменные
	
	

	// Сообщение для почты

	$message_all = 
	"Сообщение из сайта ...: " .
	"\n\nCompany Name: " 	. $companyName.
	"\nFirst Name: " 		. $firstName.
	"\nLast Name: " 		. $lastName.
	"\nContact Email: " 	. $email.
	"\nCompany Website: " 	. $companyWebsite.
	"\nCity: " 				. $city.
	"\nCountry: " 			. $country;

	// Сообщение для почты



	// Отправка на почту

	$ok = mail('info@dekolinija.lt', 'Theme', $message_all); // mail('На какую почту отправлять', 'Тема сообщения', 'Сообщение'); 

	// Отправка на почту



	// Проверка отправки на почту

	if ($ok){
		echo 'Сообщение отправлено!';
		sleep(2);
		header('Location: ' . $_SERVER['HTTP_REFERER']);
	}else{
		echo 'Фэйл(((';
	}

	// Проверка отправки на почту
 ?>