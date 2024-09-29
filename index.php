<?php session_start(); /* Starts the session */

if(!isset($_SESSION['UserData']['Username'])){
	header("location:login.php");
	exit;
}
?>
<!DOCTYPE HTML>
<html class="desktop portrait">
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta name="author" content="Evgeniy Popov" />

  <title>Скрипт распределения времени по методу Евгения Попова</title>

    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

    <link type="text/css" href="css/reset.min.css" rel="stylesheet" />
    <link type="text/css" href="css/bootstrap.min.css" rel="stylesheet" />
    <link type="text/css" href="css/bootstrap-switch.min.css" rel="stylesheet">
    <link type="text/css" href="css/jquery.ui.timepicker.css" rel="stylesheet" />
	<link type="text/css" href="css/jquery.datepicker.css" rel="stylesheet" />
    <link type="text/css" href="css/jquery-ui-1.8.23.custom.css" rel="stylesheet" />
    <link type="text/css" href="css/jquery.fancybox.css?v=2.1.2" rel="stylesheet" media="screen" />
    <link type="text/css" href="css/style.css" rel="stylesheet" />
    <link type="text/css" href="css/css_green.css" id="style" rel="stylesheet" />

    
    <script src="js/localforage.js" charset="utf-8"></script>
	<script src="js/json2.js" charset="utf-8"></script>
    <script src="js/ZeroClipboard.js" charset="utf-8"></script>
    <script src="js/device.min.js" charset="utf-8"></script>
</head>
<body>
<div id="login-top" style="width: 185px; height: 19px; font-size: 13px; position: fixed; top: 0; right: 210px; z-index: 10; text-align: center; border-radius: 0px 0px 6px 6px; color: #fff;">
    <a href="logout.php">Нажмите здесь</a> чтобы выйти
</div>
<section class="page" id="task-content">
    <div id="title-top">
        Скрипт распределения времени<br />
        по методу Евгения Попова
    </div>
    <p class="nav-time">Что планируем:
    <a class="button-select active" href="#" rel="hours">Часы</a>
    <a class="button-select" href="#" rel="days">Дни</a>
    <a class="button-select" href="#" rel="months">Месяцы</a>
    <a class="button-select" href="#" rel="years">Годы</a></p>

    <form>
        <section class="table">
            <div class="table-cell" style="width: 33%; text-align: left;">
                <div class="time-block-div" style="text-align: center;">
                    <span id="currTimeName">Планируем с:</span><br />
                    <div class="time-input-wrap">
                        <div class="clock"></div>
                        <input class="time" name="current_time" type="text" value="09:00"/>
                    </div>
                </div>
            </div>
            <div class="table-cell" style="width: 33%;">
                <div class="time-block-div">
                    <span id="toTimeName">Планируем до:</span><br />
                    <div class="time-input-wrap">
                        <div class="clock"></div>
                        <input class="time" name="to_time" type="text" value="21:00"/>
                    </div>
                </div>
            </div>
            <div class="table-cell" style="width: 33%; text-align: right;">
                <div class="time-block-div all-time">
                    <span id="allTimeName">Доступно минут:</span><br />
                    <span id="allTime">720</span>
                </div>
            </div>
        </section>

        <section class="table" style="margin-top: 50px; margin-bottom: 30px;">
            <div class="table-cell" style="width: 60%;">Задача<br />
                <div>
    <div style="display: inline-block; overflow: visible;">
        <input name="tovar_id[]" type="hidden" value="0" />

        <div class="input-group">
          <input name="task" class="text-input task form-control" type="text" placeholder="Введите задачу" style="z-index: 5; position: relative; width: 454px;" />

          <div class="input-group-btn">
            <button aria-expanded="false" data-toggle="dropdown" class="btn btn-default dropdown-toggle" type="button" style="margin-top: 5px; height: 47px; border-radius: 0 10px 10px 0;">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul id="list-izb-task" role="menu" class="dropdown-menu dropdown-menu-right"></ul>
          </div>
        </div>

    </div>
<a href="#" title="Удалить" class="deleteTovar"></a>
</div>
            </div>
            <div class="table-cell" style="width: 10%;"></div>
            <div class="table-cell" style="width: 30%;"><span id="inputTimeName">Потратить время</span><br />
               <input class="inputTime form-control" name="inputTime" type="text" value=""/>
			   <br/>
               <div style="display: none; ">
			   <div id="time_const_div">
			   <input name="time-const" class="time-const" type="button" value="10" data-original-title="Потратить 10 минут"/>
			   <input name="time-const" class="time-const" type="button" value="30" data-original-title="Потратить 30 минут"/>
			   <input name="time-const" class="time-const" type="button" value="60" data-original-title="Потратить 60 минут"/>
			   <input name="time-const" class="time-const" type="button" value="90" data-original-title="Потратить 90 минут"/>
			   <input name="time-const" class="time-const time-const_3" type="button" value="120" data-original-title="Потратить 120 минут"/>
			   </div>
			   </div>
            </div>
        </section>
        <section class="table">
            <div class="table-cell" style="width: 65%;">
                <div style="display: none; padding-bottom: 40px;">
                    <span class="span-title">Ценность</span>
                    <div id="task-cost-div">
                        <input name="task-cost" class="task-cost cost1" type="button" value="1" data-original-title="Задача с наивысшей ценностью, кото-<br />рая двигает нас к цели."/>
                        <input name="task-cost" class="task-cost cost2" type="button" value="2" data-original-title="Задача со средней ценностью, важная, но не настолько, как с ценностью 1. Двигает вперед, но не так быстро."/>
                        <input name="task-cost" class="task-cost cost3" type="button" value="3" data-original-title="Задача с нулевой ценностью, которая не влияет на скорость продвижения к цели."/>
                        <input name="task-cost" class="task-cost cost4" type="button" value="4" data-original-title="Задача с отрицательной ценностью, которая тянет назад, то есть тормозит продвижение к цели."/>
                    </div>
                </div>
            </div>
            <div class="table-cell" style="width: 5%;"></div>
            <div class="table-cell" style="width: 30%;">
                <div style="display: none; padding-bottom: 40px;">
                    <span class="span-title">Перерыв</span>
                    <div id="task-break-div">
                        <input name="task-break" class="task-break break5" type="button" value="5"/>
                        <input name="task-break" class="task-break break10" type="button" value="10"/>
                        <input name="task-break" class="task-break break15" type="button" value="15"/>
                        <input name="task-break" class="task-break break20" type="button" value="20"/>
                    </div>
                </div>
            </div>
        </section>
    </form>


    <section id="log">
        <div class="progress" style="display: none;"></div>
        <h1>Журнал затраченного времени<div style="display:none" id="date_picker_semi">:</div><div style="display:inline" id="date_picker"> на <input class="date" type="text" style="width: 125px" /></div></h1>
        <input id="current_date" type="hidden" value=""/>
        <a href="#" id="bufferCopy" style="float: right; display: none;">Копировать в буффер</a>
        <section id="log-conteiner"></section>
		
		<div style="display: none; padding: 0 100px; text-align: right;" id="todoist-save-section">
		<div class="btn-group" style="display: none">
               <button type="button" aria-expanded="false" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                  Сохранить задачи в Todoist-проекте
                  <span class="caret" style="margin-left: 7px;"></span>
               </button>

               <ul id="select-list-to-task-add-todoist" class="dropdown-menu dropdown-menu-right" role="menu"></ul>
            </div>
        </div>
        <section id="log-itog">
            <h1>Картина дня:</h1>
            <section class="table" style="width: 820px;">
                <div id="table-cell-cost1" class="table-cell table-cell-cost" style="width: 17%;">
                    <span class="cost-label" style="background-position: 13px 0;"></span>
                    Самолёт
                    <span id="itog-cost-1" class="round">0%</span>
                </div>
                <div id="table-cell-cost2" class="table-cell table-cell-cost" style="width: 23%;">
                    <span class="cost-label" style="background-position: -153px 0;"></span>
                    Гоночный болид
                    <span id="itog-cost-2" class="round">0%</span>
                </div>
                <div id="table-cell-cost3" class="table-cell table-cell-cost" style="width: 34%;">
                    <span class="cost-label" style="background-position: -390px 0;"></span>
                    Вынужденная остановка
                    <span id="itog-cost-3" class="round">0%</span>
                </div>
                <div id="table-cell-cost4" class="table-cell table-cell-cost" style="width: 26%;">
                    <span class="cost-label" style="background-position: -632px 0;"></span>
                    Дорога-Ловушка
                    <span id="itog-cost-4" class="round">0%</span>
                </div>
            </section>
        </section>
    </section>
</section>
<footer>
    <p style="margin-bottom: 40px;">Скрипт работает в этих браузерах: <span id="browsers">
        <a href="https://www.google.ru/chrome/browser/desktop/index.html" target="_blank"></a>
        <a href="https://www.mozilla.org/ru/firefox/new/" target="_blank"></a>
        <a href="http://www.opera.com/ru" target="_blank"></a>
        <a href="http://www.apple.com/ru/safari/" target="_blank" style="margin-right: 0;"></a>
    </span></p>
</footer>


<nav id="settins-panel">
    <div style="position: relative; padding: 1px 0;">
        <nav id="settins-button"></nav>

        <div class="settins-panel-block">СТИЛЬ<br />
            <div class="selected-style active" data-style="green" data-set-name="style"></div>
            <div class="selected-style" data-style="sky-blue" data-set-name="style"></div>
            <div class="selected-style" data-style="white" data-set-name="style"></div>
            <div class="selected-style" data-style="sky" data-set-name="style"></div>
            <div class="clear"></div>
        </div>

        <div class="settins-panel-block">ФОН<br />
            <div class="selected-bg" data-bg="t-sky" data-set-name="background"></div>
            <div class="selected-bg" data-bg="t-blue" data-set-name="background"></div>
            <div class="selected-bg" data-bg="sky" data-set-name="background"></div>
            <div class="clear"></div>
        </div>

        <div class="settins-panel-block">
            ЦЕННОСТЬ <a id="switcher_cost" class="switcher" data-switch="cost" href="#" data-set-name="task_cost"></a>
            <div class="clear"></div>
        </div>
        <div class="settins-panel-block">
            ПЕРЕРЫВЫ <a class="switcher" data-switch="break" href="#" data-set-name="task_break"></a>
            <div class="clear"></div>
        </div>


        <div class="settins-panel-block">ВРЕМЯ ПО УМОЛЧАНИЮ<br />
            <input class="time_deff" name="current_time_deff" type="text" value="6:00" data-set-name="current_time"/> <input class="time_deff" name="to_time_deff" type="text"  value="22:00" data-set-name="to_time"/>
            <div class="clear">
        </div>

        <div class="settins-panel-block">
            <a class="fancybox task-izb-a" href="#task-izb-section">ПОВТОРЯЮЩИЕСЯ ЗАДАЧИ</a>
        </div>
        <div style="display: none;">
        <section id="task-izb-section">
            <p align="center">ПОВТОРЯЮЩИЕСЯ ЗАДАЧИ:</p><br />
                        <p style="font-size: 14px; line-height: 20px;">У вас возможны ситуации, когда некоторые задачи будут повторяться. Чтобы их не вводить каждый раз вручную, вам нужно подобные задачи заносить в список повторяющихся задач. Когда нужно будет ввести повторяющуюся задачу, кликните по треугольнику в правом крае текстового поля ввода задачи. Появится список из раннее добавленных вами повторяющихся задач, в котором вы можете кликнуть по нужной и она введется автоматически.</p>
            <p style="font-size: 14px; line-height: 20px;">Для занесения задачи в список повторяющихся вам нужно в <strong>Журнале затраченного времени</strong> кликнуть по белому треугольнику, расположенному справа от добавляемой задачи. В появившемся контекстном меню кликните по строке "Добавить задачу в повторяющиеся". Если такой задачи еще нет в списке повторяющихся, она будет добавлена.</p>
                    </section>
        </div>
		<div class="settins-panel-block">
            <a id="todoist-projects" class="fancybox settings-todoist-a" style="display: none" href="#todoist-div">СПИСКИ TODOIST</a>
            <div id="todoist_ident2"></div>
            <a id="todoist-settings" class="fancybox settings-todoist-a" href="#settings-todoist-div">НАСТРОЙКИ TODOIST</a>
        </div>
    </div>
</nav>

<div style="display: none;">
    <div id="instr-content">
        <h1>Инструкция по использованию скрипта</h1>

    </div>
</div>
<div id="settings-todoist-div" style="display: none; width: 900px;">
    <section style="padding: 7px 12px;">
        <h1>Настройка взаимодействия с Todoist по API</h1><br />
        <p><strong>Шаг 1.</strong> Для работы с Todoist по api-интерфейсу первым делом вы должны зайти в свой аккаунт.</p>

                <p><strong>https://todoist.com/</strong></p>

        <img class="picture" src="images/todoist/step1.png" style="max-width: 100%" />
        <p>&nbsp;</p>

        <p><strong>Шаг 2.</strong> После авторизации перейдите в настройки.</p>
        <img class="picture" src="images/todoist/step2.png" style="max-width: 100%" />
        <p>&nbsp;</p>

        <p><strong>Шаг 3.</strong>Перейдите к разделу Интеграции</p>
        <img class="picture" src="images/todoist/step3.png" style="max-width: 100%" />
        <p>&nbsp;</p>

        <p><strong>Шаг 4.</strong> Скопируйте и введите <strong>Токен API</strong> в соответствующее поле ниже
		<img class="picture" src="images/todoist/step4.png" style="max-width: 100%" />
        <form action="" method="post" id="todoist_app_settings">

            <div class="input-group">
              <span id="basic-addon1" class="input-group-addon" style="width: 110px;">Токен API</span>
              <input required="" name="token_id" type="text" placeholder="Введите сюда значение Токен API" class="form-control" style="width: 600px;">
            </div><br />

            <input name="action" type="hidden" value="set-todoist" />
            <button class="btn btn-primary">Сохранить и получить доступ к api todoist</button>
            <div id="todoist_ident1" style="display: inline-block; margin-left: 10px;"></div>
        </form><br />
    </section>
</div>
<div id="todoist-div" style="display: none; width: 900px;">
    <section style="padding: 7px 12px;">
        <h1>Доступ к Todoist успешно настроен!</h1><br />
        <p>Теперь вы можете настроить использование только нужных вам проектов Todoista для импорта в них задач из скрипта распределения времени.</p>
        <br />
        <h1>Настройка использования проектов Todoist</h1><br />
        <div style="width: 100%; text-align: center;">
            <table id="todoist-projects-table" align="center" border="0">
                <thead>
                    <tr>
                        <th style="width: 170px;">Название проекта</th>
                        <th style="text-align: center;">Статус</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <br /><br />
        <h1>Удалить настройки текущего приложения Todoist</h1><br />
        <p>Если вы хотите настроить скрипт на другое приложение, то вам нужно удалить настройки текущего приложения. Для этого нажмите на расположенную ниже кнопку.</p>
        <div style="width: 100%; text-align: center;"><button id="todoist_clear_settings" class="btn btn-primary">Удалить</button></div>
    </section>
</div>
<script src="js/jquery-1.10.2.min.js" charset="utf-8"></script>
    <script src="js/jquery-migrate-1.2.1.min.js" charset="utf-8"></script>
    <script src="js/jquery-ui-1.8.23.custom.min.js" charset="utf-8"></script>
    <script src="js/jquery.ui.timepicker.js" charset="utf-8"></script>
    <script src="js/jquery.fancybox.js?v=2.1.3" charset="utf-8"></script>
    <script src="js/bootstrap.min.js" charset="utf-8"></script>
    <script src="js/bootstrap-switch.min.js" charset="utf-8"></script>
    <script src="js/bootstrap-tooltip.js" charset="utf-8"></script>
	<script src="js/jquery.animateNumber.min.js" charset="utf-8"></script>
<script src="js/jquery.datepicker.js" charset="utf-8"></script>
	<script src="js/script.js" charset="utf-8"></script>
</body>
</html>