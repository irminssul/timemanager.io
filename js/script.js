function htmlspecialchars(string, quote_style, charset, double_encode) {
  //       discuss at: http://phpjs.org/functions/htmlspecialchars/
  //      original by: Mirek Slugen
  //      improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //      bugfixed by: Nathan
  //      bugfixed by: Arno
  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
  //      bugfixed by: Brett Zamir (http://brett-zamir.me)
  //       revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //         input by: Ratheous
  //         input by: Mailfaker (http://www.weedem.fr/)
  //         input by: felix
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //             note: charset argument not supported
  //        example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
  //        returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
  //        example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES']);
  //        returns 2: 'ab"c&#039;d'
  //        example 3: htmlspecialchars('my "&entity;" is still here', null, null, false);
  //        returns 3: 'my &quot;&entity;&quot; is still here'

  var optTemp = 0,
    i = 0,
    noquotes = false;
  if (typeof quote_style === 'undefined' || quote_style === null) {
    quote_style = 2;
  }
  string = string.toString();
  if (double_encode !== false) {
    // Put this first to avoid double-encoding
    string = string.replace(/&/g, '&amp;');
  }
  string = string.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  var OPTS = {
    'ENT_NOQUOTES': 0,
    'ENT_HTML_QUOTE_SINGLE': 1,
    'ENT_HTML_QUOTE_DOUBLE': 2,
    'ENT_COMPAT': 2,
    'ENT_QUOTES': 3,
    'ENT_IGNORE': 4
  };
  if (quote_style === 0) {
    noquotes = true;
  }
  if (typeof quote_style !== 'number') {
    // Allow for a single string or an array of string flags
    quote_style = [].concat(quote_style);
    for (i = 0; i < quote_style.length; i++) {
      // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
      if (OPTS[quote_style[i]] === 0) {
        noquotes = true;
      } else if (OPTS[quote_style[i]]) {
        optTemp = optTemp | OPTS[quote_style[i]];
      }
    }
    quote_style = optTemp;
  }
  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
    string = string.replace(/'/g, '&#039;');
  }
  if (!noquotes) {
    string = string.replace(/"/g, '&quot;');
  }

  return string;
}


Date.prototype.daysInMonth = function() {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

$(function(){


    var desktop = 0;

    if (device.ios()) {
        if (device.ipad()) {
          // ios ipad tablet
        } else if (device.iphone()) {
          // ios iphone mobile
        } else if (device.ipod()) {
          // ios ipod mobile
        }
    } else if (device.android()) {
        if (device.androidTablet()) {
          //android tablet
        } else {
          //android mobile
        }
    } else if (device.blackberry()) {
        if (device.blackberryTablet()) {
          //blackberry tablet
        } else {
          //blackberry mobile
        }
    } else if (device.windows()) {
        if (device.windowsTablet()) {
          //windows tablet
        } else if (device.windowsPhone()) {
          //windows mobile
        } else {
          desktop = 1;
        }
    } else if (device.fxos()) {
        if (device.fxosTablet()) {
          // fxos tablet
        } else {
          // fxos mobile
        }
    } else {
        desktop = 1;
    }

    if(!desktop){
        alert("Данный скрипт можно использовать только в десктопных версиях<br /> операционных систем Windows и OS X (Mac OS).");
    }

    var date = new Date()
        , current_time = 6 * 60 
        , to_time = 22 * 60
        , fromDate = new Date(date.getTime())
        , toDate = new Date(date.getTime())
        , all_time = to_time - current_time
        , all_time_deff = to_time - current_time
        , input_time = 0
        , input_task = 0
        , log = ''
        , keycode = null
        , time_period = 'hours'
        , monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
        , monthsFull = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        , task_cost = 0
        , task_break = 0
        , last_keycode = 0
        , select_task_log = null
        , log_itog = []
        , log_ends = ' мин';

    var top_panel_height = (($(window).height() - $('#settins-panel').height())/2 < 195) ? ($(window).height() - $('#settins-panel').height())/2:195;

    $('#settins-panel').css({'top': top_panel_height+'px'});
    $('body, body *').click(function(event){
        if(!$(event.target).parents('#settins-panel').length){
            $('#settins-panel').attr('class', 'hide-panel');
        }
    });

    function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
    	//  Вызов number_format(1234.5678, 2, ',',' ');
    	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    	// +	 bugfix by: Michael White (http://crestidg.com)

    	var i, j, kw, kd, km;

    	// input sanitation & defaults
    	if( isNaN(decimals = Math.abs(decimals)) ){
    		decimals = 2;
    	}
    	if( dec_point == undefined ){
    		dec_point = ",";
    	}
    	if( thousands_sep == undefined ){
    		thousands_sep = ".";
    	}

    	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    	if( (j = i.length) > 3 ){
    		j = j % 3;
    	} else{
    		j = 0;
    	}

    	km = (j ? i.substr(0, j) + thousands_sep : "");
    	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
    	return km + kw + kd;
    }

    var initclip = function(){
        var client = new ZeroClipboard($("a.copy-to-buffer"));
        client.on( "ready", function( readyEvent ) {
          console.log( "ZeroClipboard SWF is ready!" );

          client.on( "copy", function (event) {
            var clipboard = event.clipboardData;
            var o = $(event.target).parent();
            var log = o.find('input[name="task-log"]').val()+' ('+o.find('span.task-log-time').html()+') '+o.find('span.task-log-period').html();
            log += (o.find('span.task-log-cost').length)? ' ['+o.find('span.task-log-cost').html()+']':'';
            clipboard.setData( "text/plain", log);
          });

          client.on( "aftercopy", function( event ) {
            // `this` === `client`
            // `event.target` === the element that was clicked
            event.target.style.opacity = "0.5";
            console.log("Copied text to clipboard: " + event.data["text/plain"] );
          });

        });
    }

    initclip();

    function progressPercent(percent, task_cost){
        percent = 1*number_format(100*input_time/all_time_deff, 5, '.', '');
        var percent_ = 0;
        $('.progress-bar').each(function(){
            percent_ += 1*$(this).attr('style').replace(/width: /, '').replace(/%;/, '');
        });

        if(percent_ + percent > 100 || percent_ + percent > 99.9){
            percent = 100 - percent_;
            $('.progress').addClass('progress-bar'+task_cost);
        }

        return percent;
    }

	 var calculateTime = function (clear) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var time_unit = '';

        console.log('(current_time + input_time) > to_time', current_time, input_time, to_time);
        console.log('(fromDate.getTime() + (input_time * oneDay)) >= toDate.getTime()', fromDate.getTime(), input_time, (input_time * oneDay), toDate.getTime());

        if (time_period == 'hours' && (current_time + input_time) > to_time) {
            if ((to_time - current_time) * 1 == 0) {
                alert('Доступное время исчерпано!');
            }
            else {
                input_time = 0;

                $('[name="inputTime"]').val('');

                time_unit = 'мин.';

                confirm('У вас осталось только ' + (to_time - current_time) + ' ' + time_unit + ', хотите задействаоть их полностью?', function () {
                    input_time = 1 * (to_time - current_time);
                    $('[name="inputTime"]').val(input_time);
                    calculateTime(1);
                });
            }

            return false;
        }

        if (time_period == 'days') {
            var diffDays = 0;
            if (fromDate.getTime() <= toDate.getTime()) {
                diffDays = Math.floor(Math.abs((fromDate.getTime() - toDate.getTime()) / (oneDay))) + 1;
            }

            if (diffDays < 1) {
                alert('Доступное время исчерпано!');

                return false;
            }
            else if (diffDays < input_time) {
                input_time = 0;

                $('[name="inputTime"]').val('');

                time_unit = 'дн.';

                confirm('У вас осталось только ' + diffDays + ' ' + time_unit + ', хотите задействаоть их полностью?', function () {
                    input_time = diffDays;
                    $('[name="inputTime"]').val(diffDays);
                    calculateTime(1);
                });
            }
        }

        if (time_period == 'months') {
            var diffDays = 0;
            if (fromDate.getTime() <= toDate.getTime()) {
                diffDays = toDate.getMonth() - fromDate.getMonth() + (12 * (toDate.getFullYear() - fromDate.getFullYear())) + 1;
            }

            if (diffDays < 1) {
                alert('Доступное время исчерпано!');

                return false;
            }
            else if (diffDays < input_time) {
                input_time = 0;

                $('[name="inputTime"]').val('');

                time_unit = 'мес.';

                confirm('У вас осталось только ' + diffDays + ' ' + time_unit + ', хотите задействаоть их полностью?', function () {
                    input_time = diffDays;
                    $('[name="inputTime"]').val(diffDays);
                    calculateTime(1);
                });
            }
        }

        if (time_period == 'years') {
            var diffDays = 0;
            if (fromDate.getTime() <= toDate.getTime()) {
                diffDays = toDate.getFullYear() - fromDate.getFullYear() + 1;
            }

            if (diffDays < 1) {
                alert('Доступное время исчерпано!');

                return false;
            }
            else if (diffDays < input_time) {
                input_time = 0;

                $('[name="inputTime"]').val('');

                time_unit = 'лет';

                confirm('У вас осталось только ' + diffDays + ' ' + time_unit + ', хотите задействаоть их полностью?', function () {
                    input_time = diffDays;
                    $('[name="inputTime"]').val(diffDays);
                    calculateTime(1);
                });
            }
        }

        if (task_cost) {
            $('#task-cost-div').parent().slideDown(300);
        }

        if (task_break && time_period == 'hours') {
            $('#task-break-div').parent().slideDown(300);
        } else {
            $('#task-break-div').parent().slideUp(300);
        }
		
		if(time_period == 'hours'){
          	$('#time_const_div').parent().slideDown(300);
        } else {
		   $('#time_const_div').parent().slideUp(300);
        }

        var task_cost_str = (task_cost) ? ' [' + task_cost + ']' : '';
        var task_cost_html = (task_cost) ? '<span class="task-log-cost cost' + task_cost + '">' + task_cost + '</span>' : '';

        if (time_period == 'hours') {
            current_time += input_time;
            $('input[name="current_time"]').val(timeFormat(current_time));
            $('input[name="to_time"]').val(timeFormat(to_time));

            var all_time = ((to_time - current_time) > 0) ? (to_time - current_time) : 0;

            if (input_time && input_task) {

                var task_id = newTaskId();
                if (task_cost) {
                    $('div.progress').append('<div id="progress-' + task_id + '" class="progress-bar progress-bar' + task_cost + '" style="width: 0%;" data-original-title="' + input_task + '"></div>').show();
                    var percent = 100 * input_time / all_time_deff;
                    percent = progressPercent(percent, task_cost);
                    var i = 0;
                    (function () {
                        if (i <= percent) {
                            if (percent >= 2) {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': i + '%' }).html(number_format(i, 0, '.', '') + '%');
                            } else {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': i + '%' }).html('');
                            }
                            i += 2;
                            setTimeout(arguments.callee, 100);
                        } else {
                            if (percent >= 2) {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': percent + '%' }).html(number_format(percent, 0, '.', '') + '%');
                            } else {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': percent + '%' }).html('');
                            }

                        }
                    })();
                    $('.progress-bar').tooltip({ 'placement': 'bottom', 'delay': 1000 });
                }

                if (clear) {
                    $('input[name="inputTime"]').val('');
                    $('input[name="task"]').val('');
                }

                $('#log-conteiner').append('<article id="'
                    + task_id
                    + '" data-task-time="'
                    + timeFormat(current_time - input_time)
                    + '" class="task-log" style="display: none;"> <div class="gradient"></div> <div style="display: inline-block; float: left; width: 320px;"><div class="input-group"><input name="task-log" value="'
                    + htmlspecialchars(input_task)
                    + '" /><div class="input-group-btn"><button aria-expanded="false" data-toggle="dropdown" class="btn btn-default dropdown-toggle" type="button" style="margin-top: 0px; height: 26px; border-radius: 0; background: transparent; border: 0;"><span class="caret" style="border-top-color: #fff;"></span><span class="sr-only">Toggle Dropdown</span></button><ul role="menu" class="dropdown-menu dropdown-menu-left menu-operation"><li><a href="#" data-action="addTaskIzb" rel="'
                    + task_id
                    + '">Добавить задачу в повторяющиеся</a></li><li><a href="#" data-action="addTaskInput" rel="'
                    + task_id + '">Добавить задачу как новую</a></li><li><a href="#" data-action="abortTask" rel="'
                    + task_id + '">Удалить задачу</a></li></ul></div></div></div> <span class="task-log-time" data-time-period="'
                    + time_period
                    + '" data-time-value="'
                    + input_time
                    + '">'
                    + input_time
                    + log_ends
                    + '</span> <span class="task-log-period">'
                    + timeFormat(current_time - input_time)
                    + ' - '
                    + timeFormat(current_time) + '</span> '
                    + task_cost_html + '<a class="copy-to-buffer">Скопировать</a></article>');
                $('#' + task_id).slideDown(400);
                initclip();

                if (!log_itog[task_cost]) log_itog[task_cost] = [];
                if (!log_itog[task_cost][task_id]) log_itog[task_cost][task_id] = [];
                if (!log_itog[task_cost][task_id]['percent']) log_itog[task_cost][task_id]['percent'] = 0;
                log_itog[task_cost][task_id]['percent'] = percent;
                log_itog.forEach(itogTasks);
                $('#todoist-save-section').show();

            }

            accessibleTime(all_time, 5);

            setTimeout(function () {
                $('input[name="task"]').trigger('focus');
            }, 0);

            input_time = 0;

            return;

        }

        if (time_period == 'days') {
            var task_start = fromDate.getFullYear() + '-' + $.datePicker.utils.pad(fromDate.getMonth() + 1, 2) + '-' + $.datePicker.utils.pad(fromDate.getDate(), 2);

            if (input_time * 1 == 1) {
                var task_period = fromDate.getDate() + ' ' + monthNames[fromDate.getMonth()];
                fromDate.setDate(fromDate.getDate() + input_time);
            }
            else if (input_time * 1 > 1) {
                var task_period = fromDate.getDate() + ' ' + monthNames[fromDate.getMonth()];
                var d = new Date(fromDate.getTime() - oneDay);
                d.setDate(d.getDate() + input_time);

                if (fromDate.getMonth() == d.getMonth()) {
                    task_period = fromDate.getDate() + ' - ' + d.getDate() + ' ' + monthNames[d.getMonth()];
                }
                else {
                    task_period += ' - ' + d.getDate() + ' ' + monthNames[d.getMonth()];
                }

                fromDate.setTime(d.getTime() + oneDay);
            }
            current_time = ('0' + fromDate.getDate()).slice(-2) + '.' + ('0' + (fromDate.getMonth() + 1)).slice(-2) + '.' + fromDate.getFullYear();
            to_time = ('0' + toDate.getDate()).slice(-2) + '.' + ('0' + (toDate.getMonth() + 1)).slice(-2) + '.' + toDate.getFullYear();

            var firstDate = fromDate;
            var secondDate = toDate;
            var diffDays = 0;
            if (firstDate.getTime() <= secondDate.getTime()) {
                diffDays = Math.floor(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))) + 1;
            }
            console.log('diffDays 3', firstDate, secondDate, diffDays);

            all_time = diffDays;
            all_time_deff = diffDays;

            console.log('current_time', current_time);
            $('input[name="current_time"]').val(current_time);
            $('input[name="to_time"]').val(to_time);

            if (input_time && input_task) {
                var task_id = newTaskId();

                if (task_cost) {
                    $('div.progress').append('<div id="progress-' + task_id + '" class="progress-bar progress-bar' + task_cost + '" style="width: 0%;" data-original-title="' + input_task + '"></div>');
                    var percent = 100 * input_time / all_time_deff;
                    percent = progressPercent(percent, task_cost);
                    var i = 0;
                    (function () {
                        if (i <= percent) {
                            if (percent >= 2) {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': i + '%' }).html(number_format(i, 0, '.', '') + '%');
                            } else {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': i + '%' }).html('');
                            }
                            i += 2;
                            setTimeout(arguments.callee, 100);
                        } else {
                            if (percent >= 2) {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': percent + '%' }).html(number_format(percent, 0, '.', '') + '%');
                            } else {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': percent + '%' }).html('');
                            }
                        }
                    })();
                    $('.progress-bar').tooltip({ 'placement': 'bottom', 'delay': 1000 });
                }

                if (clear) {
                    $('input[name="inputTime"]').val('');
                    $('input[name="task"]').val('');
                }

                $('#log-conteiner').append('<article id="'
                    + task_id
                    + '" data-task-time="'
                    + task_start
                    + '" class="task-log" style="display: none;"> <div class="gradient"></div> <div style="display: inline-block; float: left; width: 320px;"><div class="input-group"><input name="task-log" value="'
                    + htmlspecialchars(input_task)
                    + '" /><div class="input-group-btn"><button aria-expanded="false" data-toggle="dropdown" class="btn btn-default dropdown-toggle" type="button" style="margin-top: 0px; height: 26px; border-radius: 0; background: transparent; border: 0;"><span class="caret" style="border-top-color: #fff;"></span><span class="sr-only">Toggle Dropdown</span></button><ul role="menu" class="dropdown-menu dropdown-menu-left menu-operation"><li><a href="#" data-action="addTaskIzb" rel="'
                    + task_id
                    + '">Добавить задачу в повторяющиеся</a></li><li><a href="#" data-action="addTaskInput" rel="'
                    + task_id
                    + '">Добавить задачу как новую</a></li><li><a href="#" data-action="abortTask" rel="'
                    + task_id
                    + '">Удалить задачу</a></li></ul></div></div></div> <span class="task-log-time date" data-time-period="'
                    + time_period
                    + '" data-time-value="'
                    + input_time
                    + '">'
                    + input_time
                    + log_ends
                    + '</span> <span class="task-log-period">'
                    + task_period
                    + '</span> '
                    + task_cost_html
                    + ' <a class="copy-to-buffer">Скопировать</a></article>');
                $('#' + task_id).slideDown(400);
                initclip();

                if (!log_itog[task_cost]) log_itog[task_cost] = [];
                if (!log_itog[task_cost][task_id]) log_itog[task_cost][task_id] = [];
                if (!log_itog[task_cost][task_id]['percent']) log_itog[task_cost][task_id]['percent'] = 0;
                log_itog[task_cost][task_id]['percent'] = percent;
                log_itog.forEach(itogTasks);
                $('#todoist-save-section').show();

            }
        }

        if (time_period == 'months') {
            var task_start = fromDate.getFullYear() + '-' + $.datePicker.utils.pad(fromDate.getMonth() + 1, 2) + '-01';

            if (input_time * 1 == 1) {
                var task_period = monthsFull[fromDate.getMonth()];
                fromDate.setMonth(fromDate.getMonth() + input_time);
            }
            else if (input_time * 1 > 1) {
                var task_period = monthsFull[fromDate.getMonth()];
                fromDate.setMonth(fromDate.getMonth() + input_time);
                var m = ((fromDate.getMonth() - 1) < 0) ? 11 : (fromDate.getMonth() - 1);
                task_period += ' - ' + monthsFull[m];
            }
            current_time = monthsFull[fromDate.getMonth()] + ' ' + fromDate.getFullYear();
            to_time = monthsFull[toDate.getMonth()] + ' ' + toDate.getFullYear();

            var firstDate = fromDate;
            var secondDate = toDate;
            var diffMonths = toDate.getMonth() - fromDate.getMonth() + (12 * (toDate.getFullYear() - fromDate.getFullYear())) + 1;
            console.log('diffMonths 4', firstDate, secondDate, diffMonths);

            all_time = diffMonths;
            all_time_deff = diffMonths;

            console.log('current_time', current_time);
            $('input[name="current_time"]').val(current_time);
            $('input[name="to_time"]').val(to_time);

            if (input_time && input_task) {
                var task_id = newTaskId();
                if (task_cost) {
                    $('div.progress').append('<div id="progress-' + task_id + '" class="progress-bar progress-bar' + task_cost + '" style="width: 0%;" data-original-title="' + input_task + '"></div>');
                    var percent = 100 * input_time / all_time_deff;
                    percent = progressPercent(percent, task_cost);
                    var i = 0;
                    (function () {
                        if (i <= percent) {
                            if (percent >= 2) {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': i + '%' }).html(number_format(i, 0, '.', '') + '%');
                            } else {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': i + '%' }).html('');
                            }
                            i += 2;
                            setTimeout(arguments.callee, 100);
                        } else {
                            if (percent >= 2) {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': percent + '%' }).html(number_format(percent, 0, '.', '') + '%');
                            } else {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': percent + '%' }).html('');
                            }
                        }
                    })();
                    $('.progress-bar').tooltip({ 'placement': 'bottom', 'delay': 1000 });
                }

                if (clear) {
                    $('input[name="inputTime"]').val('');
                    $('input[name="task"]').val('');
                }

                $('#log-conteiner').append('<article id="'
                    + task_id
                    + '" data-task-time="'
                    + task_start
                    + '" class="task-log" style="display: none;"> <div class="gradient"></div> <div style="display: inline-block; float: left; width: 320px;"><div class="input-group"><input name="task-log" value="'
                    + htmlspecialchars(input_task)
                    + '" /><div class="input-group-btn"><button aria-expanded="false" data-toggle="dropdown" class="btn btn-default dropdown-toggle" type="button" style="margin-top: 0px; height: 26px; border-radius: 0; background: transparent; border: 0;"><span class="caret" style="border-top-color: #fff;"></span><span class="sr-only">Toggle Dropdown</span></button><ul role="menu" class="dropdown-menu dropdown-menu-left menu-operation"><li><a href="#" data-action="addTaskIzb" rel="'
                    + task_id
                    + '">Добавить задачу в повторяющиеся</a></li><li><a href="#" data-action="addTaskInput" rel="'
                    + task_id
                    + '">Добавить задачу как новую</a></li><li><a href="#" data-action="abortTask" rel="'
                    + task_id
                    + '">Удалить задачу</a></li></ul></div></div></div> <span class="task-log-time date" data-time-period="'
                    + time_period
                    + '" data-time-value="'
                    + input_time
                    + '">'
                    + input_time
                    + log_ends
                    + '</span> <span class="task-log-period">'
                    + task_period
                    + '</span> '
                    + task_cost_html
                    + ' <a class="copy-to-buffer">Скопировать</a></article>');
                $('#' + task_id).slideDown(400);
                initclip();

                if (!log_itog[task_cost]) log_itog[task_cost] = [];
                if (!log_itog[task_cost][task_id]) log_itog[task_cost][task_id] = [];
                if (!log_itog[task_cost][task_id]['percent']) log_itog[task_cost][task_id]['percent'] = 0;
                log_itog[task_cost][task_id]['percent'] = percent;
                log_itog.forEach(itogTasks);
                $('#todoist-save-section').show();

            }
        }

        if (time_period == 'years') {
            var task_start = fromDate.getFullYear() + '-01-01';

            if (input_time * 1 == 1) {
                var task_period = fromDate.getFullYear().toString();
                fromDate.setFullYear(fromDate.getFullYear() + input_time);
            }
            else if (input_time * 1 > 1) {
                var task_period = fromDate.getFullYear().toString();
                fromDate.setFullYear(fromDate.getFullYear() + input_time);
                task_period += '-' + (fromDate.getFullYear() - 1).toString();
            }
            current_time = fromDate.getFullYear();
            to_time = toDate.getFullYear();

            var firstDate = fromDate;
            var secondDate = toDate;
            var diffYears = toDate.getFullYear() - fromDate.getFullYear() + 1;
            console.log('diffMonths 5', firstDate, secondDate, diffYears);

            all_time = diffYears;
            all_time_deff = diffYears;

            console.log('current_time', current_time);
            $('input[name="current_time"]').val(current_time);
            $('input[name="to_time"]').val(to_time);

            if (input_time && input_task) {
                log_ends = (input_time * 1 > 1) ? ' гг.' : ' г.';
                time_ends = (input_time.toString().slice(-1) * 1 > 4) ? ' лет' : ' г.';

                var task_id = newTaskId();
                if (task_cost) {
                    $('div.progress').append('<div id="progress-' + task_id + '" class="progress-bar progress-bar' + task_cost + '" style="width: 0%;" data-original-title="' + input_task + '"></div>');
                    var percent = 100 * input_time / all_time_deff;
                    percent = progressPercent(percent, task_cost);
                    var i = 0;
                    (function () {
                        if (i <= percent) {
                            if (percent >= 2) {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': i + '%' }).html(number_format(i, 0, '.', '') + '%');
                            } else {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': i + '%' }).html('');
                            }
                            i += 2;
                            setTimeout(arguments.callee, 100);
                        } else {
                            if (percent >= 2) {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': percent + '%' }).html(number_format(percent, 0, '.', '') + '%');
                            } else {
                                $('div.progress-bar' + task_cost + ':last').css({ 'width': percent + '%' }).html('');
                            }
                        }
                    })();
                    $('.progress-bar').tooltip({ 'placement': 'bottom', 'delay': 1000 });
                }

                if (clear) {
                    $('input[name="inputTime"]').val('');
                    $('input[name="task"]').val('');
                }

                $('#log-conteiner').append('<article id="'
                    + task_id
                    + '" data-task-time="'
                    + task_start
                    + '" class="task-log" style="display: none;"> <div class="gradient"></div> <div style="display: inline-block; float: left; width: 320px;"><div class="input-group"><input name="task-log" value="'
                    + htmlspecialchars(input_task)
                    + '" /><div class="input-group-btn"><button aria-expanded="false" data-toggle="dropdown" class="btn btn-default dropdown-toggle" type="button" style="margin-top: 0px; height: 26px; border-radius: 0; background: transparent; border: 0;"><span class="caret" style="border-top-color: #fff;"></span><span class="sr-only">Toggle Dropdown</span></button><ul role="menu" class="dropdown-menu dropdown-menu-left menu-operation"><li><a href="#" data-action="addTaskIzb" rel="'
                    + task_id
                    + '">Добавить задачу в повторяющиеся</a></li><li><a href="#" data-action="addTaskInput" rel="'
                    + task_id
                    + '">Добавить задачу как новую</a></li><li><a href="#" data-action="abortTask" rel="'
                    + task_id
                    + '">Удалить задачу</a></li></ul></div></div></div> <span class="task-log-time date" data-time-period="'
                    + time_period
                    + '" data-time-value="'
                    + input_time
                    + '">'
                    + input_time
                    + time_ends
                    + '</span> <span class="task-log-period">'
                    + task_period
                    + log_ends
                    + '</span> '
                    + task_cost_html + ' <a class="copy-to-buffer">Скопировать</a></article>');
                $('#' + task_id).slideDown(400);
                initclip();

                if (!log_itog[task_cost]) log_itog[task_cost] = [];
                if (!log_itog[task_cost][task_id]) log_itog[task_cost][task_id] = [];
                if (!log_itog[task_cost][task_id]['percent']) log_itog[task_cost][task_id]['percent'] = 0;
                log_itog[task_cost][task_id]['percent'] = percent;
                log_itog.forEach(itogTasks);
                $('#todoist-save-section').show();

            }
        }

        accessibleTime(all_time, 10);

        setTimeout(function () {
            $('input[name="task"]').trigger('focus');
        }, 0);

        input_time = 0;
        return;
    }
   
    var itogCostPercent = function(index, percent, timeout){

        var o = $('#itog-cost-'+index);
        var start_percent = o.html().replace(/%/, '')*1;
        if(start_percent == percent){
            o.html(percent+'%');
            return false;
        }

        if(start_percent < percent){
            start_percent++;
        }

        if(start_percent > percent) {
            start_percent--;
        }

        o.html(start_percent+'%');
        setTimeout(function(){ itogCostPercent(index, percent, timeout); }, timeout);
    }

    function itogTasks(element, index, array){

        if(!index || !task_cost) return false;

        var percent = 0;
        for (var key in element) {
            percent += element[key]['percent'];
        }

        if(percent > 99.5){
            percent = 100;
        }

        $('#log-itog').slideDown(2000);
        percent = number_format(percent, 0, '.', '') * 1;
        itogCostPercent(index, percent, 50);
    }

    function accessibleTime(value, timeout){

        if(!timeout){
            $('#allTime').html(value);
            return;
        }

        var allTime = $('#allTime').html()*1;
        if(allTime == value){
            $('#allTime').html(value);
            return;
        }

        var increment = 1;
        if(allTime - value > 50 ||  value - allTime > 50){
            increment = 10;
        }

        if(allTime > value){
            allTime -= increment;
        } else {
            allTime += increment;
        }
        $('#allTime').html(allTime);
        setTimeout(function(){ accessibleTime(value, timeout); }, timeout);
    }

    $(window).keyup(function(event){

        keycode = event.keyCode;
        // alert(keycode);

        if(keycode == 13 && ($('input[name="task"]').is(':focus') || $('input[name="inputTime"]').is(':focus') || $('input[name="task-cost"]').is(':focus'))){

            input_task = $('input[name="task"]').val();
            input_time = $('input[name="inputTime"]').val()*1;

            if(!input_task){
                $('input[name="task"]').trigger('focus');
                return false;
            }

            if($('input[name="task"]').is(':focus')){

                if(!input_time){
                    $('input[name="inputTime"]').trigger('focus');
                    return false;
                } else {

                    if(task_cost){
                        $('input.cost1').trigger('focus');
                        return false;
                    }
                }
            }

            if($('input[name="inputTime"]').is(':focus') && input_time && task_cost){

                $('input.cost1').trigger('focus');
                return false;
            }

            if($('input[name="task-cost"]').is(':focus') && task_cost){
                task_cost = $('input[name="task-cost"]:focus').val();
                $('input[name="task-cost"]:focus').trigger('blur');
                return false;
            }

            if(!input_time){
                return false;
            }

            calculateTime(1);
        }

        // стрелка влево
        if(keycode == 37 && $('input[name="task-cost"]').is(':focus')){
            task_cost = $('input[name="task-cost"]:focus').val();
            if(task_cost > 1){
                task_cost--;
                $('input[name="task-cost"]:focus').prev().trigger('focus');
            }
        }

        // стрелка вправо
        if(keycode == 39 && $('input[name="task-cost"]').is(':focus')){
            task_cost = $('input[name="task-cost"]:focus').val();
            if(task_cost < 4){
                task_cost++;
                $('input[name="task-cost"]:focus').next().trigger('focus');
            }
        }

        // стрелка вниз
        if(keycode == 40 && $('input[name="task"]').is(':focus')){
            var data = {};
            data.action = 'searchTask';
            data.index = 0;
            data.value = 1;
            send(data);
        }

        // cntrl + c
        if(last_keycode == 17 && keycode == 67){

            $('a.copy-to-buffer:eq(0)').trigger('focus').trigger('click');
            //alert(last_keycode +'  '+ keycode);
        }

        if(!last_keycode) last_keycode = keycode;
        //alert(last_keycode +'  '+ keycode);
	});


    function timeFormat(minutes){

        minutes = minutes*1;
        var hour = Math.floor(minutes/60);
        var min = minutes - hour*60;
        if(min < 10 && min > 0){
            min = '0'+min;
        } else if(min == 0){
             min = '00';
        }

        if(hour < 10 && hour > 0){
            hour = '0'+hour;
        } else if(hour == 0){
             hour = '00';
        }

        return hour+':'+min;
    }

    function timeToMinutes(time){

        var tv = time.split(':');
        if(tv[0] && tv[1]){
            return (tv[0]*60 + tv[1]*1);
        }

        return false;
    }

    var newTaskId = function(){

        var i = 1;
        var end = 2000;
        while(i < end){

            if($('#task-'+i).length){
                i++;
            } else {
                end = i;
            }
        }

        return 'task-'+i;
    }

    $('.time, .time_deff').timepicker({
        minutes: {
            interval: 5,
            manual: [ 0, 1, 30, 59 ],
        },
        // Localization
        hourText: 'Часы',             // Define the locale text for "Hours"
        minuteText: 'Минуты',         // Define the locale text for "Minute"
        amPmText: ['', ''],
        showCloseButton: true,
        closeButtonText: 'Готово',
        afterShow: function(){
            if($(this).attr('name') == 'current_time' && time_period == 'hours'){
                $('.ui-timepicker-buttonpane').append('<a class="set-curent-time-10-min" href="" target="_blank">Текущее время + 10 мин</a>');
            }
        }
    });

	var now = new Date();
    $('#log .date').val(('0' + now.getDate()).slice(-2) + '.' + ('0' + (now.getMonth() + 1)).slice(-2) + '.' + now.getFullYear());
    $('#current_date').val(now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2));

    $('#log .date').datePicker({
        formatDate: function (date) {
            var formatted = $.datePicker.utils.pad(date.getDate(), 2) + '.' + $.datePicker.utils.pad(date.getMonth() + 1, 2) + '.' + date.getFullYear();
            return formatted;
        },
        parseDate: function (string) {
            var date = new Date();
            var parts = string.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
            if (parts && parts.length == 4) {
                date = new Date(parts[3], parts[2] - 1, parts[1]);
            }
            return date;
        },
        selectDate: function (date) {
            $.datePicker.hide();
            $('#log .date').val(('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear());
            $('#current_date').val(date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
        },
        alignRight: true
    });
	
    // изменение текущего времени
    $(document).on('change', 'input[name="current_time"]', function () {

        if (time_period == 'hours') {

            var current_time_new = timeToMinutes($(this).val());
            if (current_time_new) {

                if (current_time_new > to_time) {
                    $(this).val(timeFormat(current_time));
                    alert('Текущее время должно быть меньше запланированного времени «До»!');
                } else {
                    current_time = current_time_new;
                    all_time_deff = to_time - current_time;
                    calculateTime(1);
                }

            } else {
                $(this).val(timeFormat(current_time));
            }
        }

        if (time_period == 'days' || time_period == 'months' || time_period == 'years') {

            // var current_time_new = $(this).val() * 1;
            var current_time_new = fromDate.getTime();
			//var current_time_new=$(this).val()*1;
            if (!isNaN(current_time_new) && current_time_new > 0) {

                if (current_time_new > toDate.getTime()) {
                    $(this).val(current_time);

                    if (time_period == 'days') {
                        alert('День должен быть меньше запланированного дня «До»!');
                    }

                    if (time_period == 'months') {
                        alert('Текущий месяц должен быть меньше запланированного месяца «До»!');
                    }

                    if (time_period == 'years') {
                        alert('Текущий год должен быть меньше запланированного года «До»!');
                    }

                    fromDate.setTime(toDate.getTime());
                    return false;

                } else {
                    current_time = current_time_new;
                    all_time_deff = to_time - current_time;
                    calculateTime(1);
                }

            } else {
                $(this).val(current_time);
            }
        }
    });

    // измение времени до
    $(document).on('change', 'input[name="to_time"]', function(){

        if(time_period == 'hours'){

            var tto = $(this).val().split(':');
            if(tto[0] && tto[1]){

                var to_time_new = tto[0]*60 + tto[1]*1;
                if(to_time_new < current_time){
                    $(this).val(timeFormat(to_time));
                    alert('Запланированное время «До» должно быть больше времени начала планирования!');
                } else {
                    to_time = to_time_new;
                    all_time_deff = to_time - current_time;
                    calculateTime(1);
                }

            } else {
                $(this).val(timeFormat(current_time));
            }
        }

        if(time_period == 'days' || time_period == 'months' || time_period == 'years'){

            var to_time_new = $(this).val()*1;
            if(!isNaN(to_time_new) && to_time_new > 0){

                if(to_time_new <= current_time){

                    $(this).val(to_time);

                    if(time_period == 'days'){
                        alert('«Планируем до» должен быть больше дня начала планирования!');
                    }

                    if(time_period == 'months'){
                        alert('«Планируем до» должно быть больше месяца начала планирования!');
                    }

                    if(time_period == 'years'){
                        alert('«Планируем до» должно быть больше года начала планирования!');
                    }

                    return false;

                } else {
                    to_time = to_time_new;
                    all_time_deff = to_time - current_time;
                    calculateTime(1);
                }

            } else {
                $(this).val(current_time);
            }
        }
    });

    // выбор размерности времени
    $(document).on('click', '.button-select', function () {

        if ($('#log-conteiner').html() != '') {

            var o = $(this);
            confirm('При смене планирования лог задач будет очищен. Подтверждаете?', function () {
                $('#log-conteiner').html('');
                $('#log-itog, #todoist-save-section').hide();
                o.trigger('click');
            });

            return false;
        }

        $('a.button-select[class*="active"]').removeClass('active');
        $(this).addClass('active');
        $('.progress').html('').hide();

        time_period = $(this).attr('rel');

        if (time_period != 'hours') {
            $('#date_picker').hide();
            $('#date_picker_semi').css('display', 'inline');
        }
        else {
            $('#date_picker_semi').hide();
            $('#date_picker').css('display', 'inline');
        }

        /*
        if(time_period == 'hours'){
            $('#task-break-div').parent().slideDown(300);
        } else {
            $('#task-break-div').parent().slideUp(300);
        }
        */

        changeTimePeriod();
        return false;
    });

    function changeTimePeriod() {

        $('[name="task"]').val('');
        $('[name="inputTime"]').val('');

        if (time_period == 'hours') {
            $('#currTimeName').html('Планируем с:');
            $('#toTimeName').html('Планируем до:');
            $('#allTimeName').html('Доступно минут:');
            $('#inputTimeName').html('Потратить время');


            $('.time').unbind('click.datePicker');
            $('.time').removeClass('log-date');
            $('.time').timepicker({
                hours: {
                    starts: 0,                // First displayed hour
                    ends: 23   // Last displayed hour
                },
                minutes: {
                    interval: 5,
                    manual: [0, 1, 30, 59],
                },
                rows: 4,
                showHours: true,
                showMinutes: true,
                // Localization
                hourText: 'Часы',             // Define the locale text for "Hours"
                minuteText: 'Минуты',         // Define the locale text for "Minute"
                amPmText: ['', ''],
                showCloseButton: true,
                closeButtonText: 'Готово',
                afterShow: function () {
                    if ($(this).attr('name') == 'current_time' && time_period == 'hours') {
                        $('.ui-timepicker-buttonpane').append('<a class="set-curent-time-10-min" href="" target="_blank">Текущее время + 10 мин</a>');
                    }
                }
            });

            $('div.clock').removeClass('date');
            $('span.task-log-time').removeClass('date');
            $('.time-input-wrap').css({ 'margin': '10px 0 0 42px' });
            $('.time-input-wrap, .time').css({ width: '100px', 'font-size': '40px' });
            current_time = date.getHours() * 60 + date.getMinutes();
            to_time = 21 * 60;
            all_time = to_time - current_time;
            all_time_deff = to_time - current_time;
            input_time = 0;
            input_task = 0;
            log = '';
            log_ends = ' мин';
            send({ 'action': 'getSettings' });
        }


        if (time_period == 'days') {

            $('#currTimeName').html('Планируем с:');
            $('#toTimeName').html('Планируем до:');
            $('#allTimeName').html('Доступно дней:');
            $('#inputTimeName').html('Потратить дней');

            $('.time').unbind('click.datePicker');
            $('.time').timepicker('destroy');
            $('.time').addClass('log-date');

            $('input[name="current_time"]').datePicker({
                formatDate: function (date) {
                    var formatted = $.datePicker.utils.pad(date.getDate(), 2) + '.' + $.datePicker.utils.pad(date.getMonth() + 1, 2) + '.' + date.getFullYear();
                    return formatted;
                },
                parseDate: function (string) {
                    var date = new Date();
                    var parts = string.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
                    if (parts && parts.length == 4) {
						date = new Date(parts[3], parts[2] - 1, parts[1],0,0,0,0);
                    }
                    return date;
                },
                selectDate: function (date) {
                    $.datePicker.hide();
					fromDate=new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                    //fromDate = date;
                    $('input[name="current_time"]').trigger('change');
                    calculateTime();
                }
            });
            $('input[name="to_time"]').datePicker({
                formatDate: function (date) {
                    var formatted = $.datePicker.utils.pad(date.getDate(), 2) + '.' + $.datePicker.utils.pad(date.getMonth() + 1, 2) + '.' + date.getFullYear();
                    return formatted;
                },
                parseDate: function (string) {
                    var date = new Date();
                    var parts = string.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
                    if (parts && parts.length == 4) {
                        date = new Date(parts[3], parts[2] - 1, parts[1],0,0,0,0);
                    }
                    return date;
                },
                selectDate: function (date) {
                    $.datePicker.hide();
					toDate =new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
					//toDate = date;
					//console.log('test',date);
                    $('input[name="to_time"]').trigger('change');
                    calculateTime();
                }
            });

            $('div.clock').addClass('date');
            $('span.task-log-time').addClass('date');
            $('.time-input-wrap').css({ 'margin': '18px 0 0 31px' });
            $('.time-input-wrap, .time').css({ width: '125px', 'font-size': '24px' });
            fromDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
            current_time = ('0' + fromDate.getDate()).slice(-2) + '.' + ('0' + (fromDate.getMonth() + 1)).slice(-2) + '.' + fromDate.getFullYear();

            toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0,0, 0, 0, 0);
            to_time = ('0' + toDate.getDate()).slice(-2) + '.' + ('0' + (toDate.getMonth() + 1)).slice(-2) + '.' + toDate.getFullYear();

            var oneDay = 24 * 60 * 60 * 1000;
            var firstDate = fromDate;
            var secondDate = toDate;
            var diffDays = Math.floor(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))) + 1;
            console.log('diffDays', firstDate, secondDate, diffDays);

            all_time = diffDays;
            all_time_deff = diffDays;

            // all_time = to_time - current_time;
            // all_time_deff = to_time - current_time;

            input_time = 0;
            input_task = 0;
            log = '';
            log_ends = ' дн.';
            calculateTime(1);
        }

        if (time_period == 'months') {

            $('#currTimeName').html('Планируем с:');
            $('#toTimeName').html('Планируем до:');
            $('#allTimeName').html('Доступно&nbsp;месяцев:');
            $('#inputTimeName').html('Потратить месяцы');

            $('.time').unbind('click.datePicker');
            $('.time').timepicker('destroy');
            $('.time').addClass('log-date');
            $('input[name="current_time"]').datePicker({
                formatDate: function (date) {
                    var formatted = monthsFull[date.getMonth()] + ' ' + date.getFullYear();
                    return formatted;
                },
                parseDate: function (string) {
                    var date = new Date();
                    var parts = string.split(' ');
                    if (parts && parts.length == 2) {
                        date = new Date(parts[1], monthsFull.indexOf(parts[0]));
                    }
                    return date;
                },
                selectDate: function (date) {
                    $.datePicker.hide();
                    fromDate = date;
                    $('input[name="current_time"]').trigger('change');
                    calculateTime();
                },
                show_months: true
            });
            $('input[name="to_time"]').datePicker({
                formatDate: function (date) {
                    var formatted = monthsFull[date.getMonth()] + ' ' + date.getFullYear();
                    return formatted;
                },
                parseDate: function (string) {
                    var date = new Date();
                    var parts = string.split(' ');
                    if (parts && parts.length == 2) {
                        date = new Date(parts[1], monthsFull.indexOf(parts[0]));
                    }
                    return date;
                },
                selectDate: function (date) {
                    $.datePicker.hide();
                    toDate = date;
                    $('input[name="to_time"]').trigger('change');
                    calculateTime();
                },
                show_months: true
            });

            $('div.clock').addClass('date');
            $('span.task-log-time').addClass('date');
            $('.time-input-wrap').css({ 'margin': '18px 0 0 17px' });
            $('.time-input-wrap, .time').css({ width: '150px', 'font-size': '22px' });
            fromDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
            current_time = monthsFull[fromDate.getMonth()] + ' ' + fromDate.getFullYear();

            toDate = new Date(fromDate.getFullYear(), 11, 1, 0, 0, 0, 0);
            to_time = monthsFull[toDate.getMonth()] + ' ' + toDate.getFullYear();

            diffMonths = toDate.getMonth() - fromDate.getMonth() + (12 * (toDate.getFullYear() - fromDate.getFullYear())) + 1;

            all_time = diffMonths;
            all_time_deff = diffMonths;
            input_time = 0;
            input_task = 0;
            log = '';
            log_ends = ' мес.';
            calculateTime(1);
        }

        if (time_period == 'years') {

            $('#currTimeName').html('Планируем с:');
            $('#toTimeName').html('Планируем до:');
            $('#allTimeName').html('Доступно лет:');
            $('#inputTimeName').html('Потратить лет');

            $('.time').unbind('click.datePicker');
            $('.time').timepicker('destroy');
            $('.time').addClass('log-date');
            $('input[name="current_time"]').datePicker({
                formatDate: function (date) {
                    var formatted = date.getFullYear();
                    return formatted;
                },
                parseDate: function (string) {
                    var date = new Date();
                    var year = parseInt(string);
                    if (year && year >= 1900) {
                        date = new Date(year, 0, 1);
                    }
                    console.log('date', date, year);
                    return date;
                },
                selectDate: function (date) {
                    $.datePicker.hide();
                    fromDate = date;
                    $('input[name="current_time"]').trigger('change');
                    calculateTime();
                },
                show_years: true
            });
            $('input[name="to_time"]').datePicker({
                formatDate: function (date) {
                    var formatted = date.getFullYear();
                    return formatted;
                },
                parseDate: function (string) {
                    var date = new Date();
                    var year = parseInt(string);
                    if (year && year >= 1900) {
                        date = new Date(year, 0, 1);
                    }
                    console.log('date 2', date, year);
                    return date;
                },
                selectDate: function (date) {
                    $.datePicker.hide();
                    toDate = date;
                    $('input[name="to_time"]').trigger('change');
                    calculateTime();
                },
                show_years: true
            });

            $('div.clock').addClass('date');
            $('span.task-log-time').addClass('date');
            $('.time-input-wrap').css({ 'margin': '18px 0 0 62px' });
            $('.time-input-wrap, .time').css({ width: '60px', 'font-size': '24px' });
            fromDate = new Date(fromDate.getFullYear(), 0, 1, 0, 0, 0, 0);
            current_time = fromDate.getFullYear();

            toDate = new Date(fromDate.getFullYear() + 24, 0, 1, 0, 0, 0, 0);
            to_time = toDate.getFullYear();

            diffYears = toDate.getFullYear() - fromDate.getFullYear() + 1;

            all_time = diffYears;
            all_time_deff = diffYears;
            log = '';
            log_ends = '';
            input_time = 0;
            input_task = 0;
            calculateTime(1);
        }
    }

    // вкл/выкл ценность и перерывы
    $(document).on('click', '.switcher', function(event, state) {

        var switcher = $(this).attr('data-switch');
        var data = {};
        data.action = 'setSettings';
        data.name = $(this).attr('data-set-name');

        if($(this).attr('class') != 'switcher active'){
            $(this).addClass('active');
            eval('task_' + switcher + " = 1");
            $('#task-'+switcher+'-div').parent().slideDown(500, function(){

                if(switcher == 'cost'){
                    if($('div.progress').find('.progress-bar').length){
                        $('div.progress').slideDown(100);
                        $('#log-itog').slideDown(500);
                    }
                }
            });
            data.value = 1;

        } else {
            $(this).attr('class', 'switcher');
            eval('task_' + switcher + " = 0");
            if(!task_cost){
                $('div.progress').slideUp(100);
                $('#log-itog').slideUp(100);
            }
            $('#task-'+switcher+'-div').parent().slideUp(500);
            data.value = 0;
        }
        send(data);
        return false;
    });

	$(document).on('click', 'input[name="time-const"]', function() {
		$('input[name="inputTime"]').val($(this).val());
		if(!$('input[name="task"]').val()){
            $('input[name="task"]').trigger('focus');
            return false;
        }
		
		if ($('#switcher_cost').attr('class') != 'switcher active'){
			input_task = $('input[name="task"]').val();
			input_time = $('input[name="inputTime"]').val()*1;
			calculateTime(1);
		}
    });
	
    $(document).on('click', 'input[name="task-cost"]', function() {

        if(!$('input[name="task"]').val()){
            $('input[name="task"]').trigger('focus');
            return false;
        }

        if($('input[name="inputTime"]').val() == ''){
            alert('Заполните поле «'+$('#inputTimeName').html()+'»!');
            return false;
        }

        input_task = $('input[name="task"]').val();
        input_time = $('input[name="inputTime"]').val()*1;
        task_cost = $(this).val();
        calculateTime(1);
    });


    $(document).on('click', '.selected-bg', function() {

        var class_bg = $(this).attr('data-bg');
        $('.selected-bg').removeClass('active');
        $(this).addClass('active');
        $('body').attr('class', class_bg);

        var data = {};
        data.action = 'setSettings';
        data.name = $(this).attr('data-set-name');
        data.value = class_bg;
        send(data);
    });

    $(document).on('click', '.selected-style', function() {

        var style = $(this).attr('data-style');
        var o = $(this);
        $('.selected-style').removeClass('active');

        $(this).addClass('active');
        $('#style').attr('href', 'css/css_'+style+'.css');

        var data = {};
        data.action = 'setSettings';
        data.name = $(this).attr('data-set-name');
        data.value = style;
        send(data);
    });

    $(document).on('click', '#settins-button', function() {

        if($('#settins-panel').css('right') == '0px'){
            $('#settins-panel').attr('class', 'hide-panel');
        } else {
            $('#settins-panel').attr('class', 'show-panel');
        }
    });
	/* Работа с Todoist*/
	function CreateXmlHttpRequestObject()
	{
		//создание экземпл¤ра XmlHttpRequest
		var XmlHttp;
		try
		{
			//попытка создать объект
			XmlHttp=new XMLHttpRequest();
		}
		catch (e)
		{
			//используетс¤ IE6 или более старый браузер
			try
			{
				XmlHttp=new ActiveXObject("Microsoft.XMLHttp");
			}
			catch (e)
			{}
		}
		//возврат созданного объекта или вывод сообщени¤ об ошибке
		if (!XmlHttp)
			alert("Ошибка создани¤ объекта XMLHttpRequest");
		else
			return XmlHttp;
	}
	
	function generateUUID () { // Public Domain/MIT
		var d = new Date().getTime();
		if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
			d += performance.now(); //use high-precision timer if available
		}
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}

	function send_todoist(zapros,token){
		if (!zapros.action==""){
			switch (zapros.action){
			case "connect":
				xmlHttp=CreateXmlHttpRequestObject();
				xmlHttp.open("post","https://todoist.com/api/v7/sync",true);
				xmlHttp.onreadystatechange=todoist_connect;
				xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xmlHttp.send("token="+token+"&sync_token="+"*"+"&resource_types="+zapros.command);
			break;
			case "add-tasks":
				var commands=[];
				var i=0;
				for (var task of zapros.tasks) {
					var command={};
					var args={};
					command.type='item_add';
					command.temp_id=generateUUID();
					command.uuid=generateUUID();
					args.content=task.title;
					args.project_id=zapros.project_id;
					args.priority=5-task.priority;
					//alert (task.date.substr(0,4)+task.date.substr(5,2)+task.date.substr(8,2));
					switch (task.time_period){
						case "hours":
							var nowtask = new Date();
							currentTimeZoneOffset=nowtask.getTimezoneOffset();
							taskStartTimeUTC=new Date(Number.parseInt(task.date.substr(0,4)),Number.parseInt(task.date.substr(5,2))-1,Number.parseInt(task.date.substr(8,2)),Number.parseInt(task.start_date.substr(0,2)),Number.parseInt(task.start_date.substr(3,2)));
							taskStartTimeUTC=new Date(taskStartTimeUTC.getTime() + currentTimeZoneOffset * 60000);
							taskMonth=taskStartTimeUTC.getMonth()+1;
							if (taskMonth<10){
								taskMonth="0"+taskMonth;
							}
							taskDate=taskStartTimeUTC.getDate();
							if (taskDate<10){
								taskDate="0"+taskDate;
							}
							taskHours=taskStartTimeUTC.getHours();
							if (taskHours<10){
								taskHours="0"+taskHours;
							}
							taskMinutes=taskStartTimeUTC.getMinutes();
							if (taskMinutes<10){
								taskMinutes="0"+taskMinutes;
							}
							args.due_date_utc=taskStartTimeUTC.getFullYear()+"-"+taskMonth+"-"+taskDate+"T"+taskHours+":"+taskMinutes;
							args.auto_reminder=true;
						break;
						case "days":
							var nowtask = new Date();
							currentTimeZoneOffset=nowtask.getTimezoneOffset();
							//время задания 09:00 по местному времени
							taskStartTimeUTC=new Date(Number.parseInt(task.start_date.substr(0,4)),Number.parseInt(task.start_date.substr(5,2))-1,Number.parseInt(task.start_date.substr(8,2)),9,0);
							taskStartTimeUTC=new Date(taskStartTimeUTC.getTime() + currentTimeZoneOffset * 60000);
							taskMonth=taskStartTimeUTC.getMonth()+1;
							if (taskMonth<10){
								taskMonth="0"+taskMonth;
							}
							taskDate=taskStartTimeUTC.getDate();
							if (taskDate<10){
								taskDate="0"+taskDate;
							}
							taskHours=taskStartTimeUTC.getHours();
							if (taskHours<10){
								taskHours="0"+taskHours;
							}
							taskMinutes=taskStartTimeUTC.getMinutes();
							if (taskMinutes<10){
								taskMinutes="0"+taskMinutes;
							}
							args.due_date_utc=taskStartTimeUTC.getFullYear()+"-"+taskMonth+"-"+taskDate+"T"+taskHours+":"+taskMinutes;
							args.auto_reminder=true;
						break;
						case "months":
							var nowtask = new Date();
							currentTimeZoneOffset=nowtask.getTimezoneOffset();
							//время задания 09:00 по местному времени первого числа или завтрашнего числа текущего месяца
							if (Number.parseInt(task.start_date.substr(5,2))-1>nowtask.getMonth()) {
								taskStartTimeUTC=new Date(Number.parseInt(task.start_date.substr(0,4)),Number.parseInt(task.start_date.substr(5,2))-1,Number.parseInt(task.start_date.substr(8,2)),9,0);
							}
							else {
								taskStartTimeUTC=new Date(Number.parseInt(task.start_date.substr(0,4)),Number.parseInt(task.start_date.substr(5,2))-1,nowtask.getDate()+1,9,0);
							}
							taskStartTimeUTC=new Date(taskStartTimeUTC.getTime() + currentTimeZoneOffset * 60000);
							taskMonth=taskStartTimeUTC.getMonth()+1;
							if (taskMonth<10){
								taskMonth="0"+taskMonth;
							}
							taskDate=taskStartTimeUTC.getDate();
							if (taskDate<10){
								taskDate="0"+taskDate;
							}
							taskHours=taskStartTimeUTC.getHours();
							if (taskHours<10){
								taskHours="0"+taskHours;
							}
							taskMinutes=taskStartTimeUTC.getMinutes();
							if (taskMinutes<10){
								taskMinutes="0"+taskMinutes;
							}
							args.due_date_utc=taskStartTimeUTC.getFullYear()+"-"+taskMonth+"-"+taskDate+"T"+taskHours+":"+taskMinutes;
							args.auto_reminder=true;
						break;
						case "years":
							var nowtask = new Date();
							currentTimeZoneOffset=nowtask.getTimezoneOffset();
							//время задания 09:00 по местному времени первого числа первого месяца или следующего за текущим месяцем
							if (Number.parseInt(task.start_date.substr(0,4))>nowtask.getFullYear()) {
								taskStartTimeUTC=new Date(Number.parseInt(task.start_date.substr(0,4)),Number.parseInt(task.start_date.substr(5,2))-1,1,9,0);
							}
							else {
								taskStartTimeUTC=new Date(Number.parseInt(task.start_date.substr(0,4)),nowtask.getMonth()+1,1,9,0);
							}
							taskStartTimeUTC=new Date(taskStartTimeUTC.getTime() + currentTimeZoneOffset * 60000);
							taskMonth=taskStartTimeUTC.getMonth()+1;
							if (taskMonth<10){
								taskMonth="0"+taskMonth;
							}
							taskDate=taskStartTimeUTC.getDate();
							if (taskDate<10){
								taskDate="0"+taskDate;
							}
							taskHours=taskStartTimeUTC.getHours();
							if (taskHours<10){
								taskHours="0"+taskHours;
							}
							taskMinutes=taskStartTimeUTC.getMinutes();
							if (taskMinutes<10){
								taskMinutes="0"+taskMinutes;
							}
							args.due_date_utc=taskStartTimeUTC.getFullYear()+"-"+taskMonth+"-"+taskDate+"T"+taskHours+":"+taskMinutes;
							args.auto_reminder=true;
						break;
					}
					
					command.args=args;
					commands[i]=command;
					i++;
				}
				commands=JSON.stringify(commands);
				xmlHttp=CreateXmlHttpRequestObject();
				xmlHttp.open("post","https://todoist.com/api/v7/sync",true);
				xmlHttp.onreadystatechange=todoist_add;
				xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xmlHttp.send("token="+token+"&commands="+commands);
			break;	
			}
		}
	}

	function todoist_add(){
		if(xmlHttp.readyState==4)
		{
			//обмен с сервером завершон
			if (xmlHttp.status==200)
			{
				//ответ сервера "ок"
				var otvet;
				try
				{
					otvet=xmlHttp.responseText;
					applyes();
				}
				catch(e)
				{
					alert ("Ошибка чтения ответа сервера "+e.toString);
				}
			}
			else
			{
				alert ("Возникли проблемы при получении данных:\n"+xmlHttp.statusText);
			}
		}
	}

	function todoist_connect(){
		if(xmlHttp.readyState==4)
		{
			//обмен с сервером завершон
			if (xmlHttp.status==200)
			{
				//ответ сервера "ок"
				var otvet;
				try
				{
					otvet=xmlHttp.responseText;
					otvet=$.parseJSON(otvet);
					//alert (otvet.projects[1].name);
					user=otvet.user;
					console.log('Todoist API connected to:',user );
					var html = 'Подключено к <strong>' + user.full_name + '</strong> <i>(' + user.email + ')</i>';
					$('#todoist_ident1').html(html);
					$('#todoist_ident2').html('<p>' + html + '</p>');
					projects=otvet.projects;
					console.log('Todoist API projects:', projects);
					$('#todoist-projects-table tbody').html('');
					for (var project of projects) {
						var row = '<tr>'
						+ '<td>' + project.name + '</td>'
						+ '<td><input class="switcher-checkbox" id="sw' + project.id + '" data-list-id="' + project.id + '" data-list-title="' + project.name + '" type="checkbox" checked="" data-on-text="Использовать" data-off-text="Не использовать" data-handle-width="130" data-on-color="success"></td>'
                        + '</tr>';
                        $('#todoist-projects-table tbody').append(row);
                    }
					localforage.getItem('projects', function(err, value) {
						console.log('projects loaded', value);
						if (value != null && Object.keys(value).length > 0) {
							var data = {};
							data.action = 'todoist-set-view-list';
							data.projects = value;
							send(data);///////////////////////////////////
							$('input.switcher-checkbox').bootstrapSwitch('state', false, true);
							for (var project of value) {
                                $('input#sw'+project.id).bootstrapSwitch('state', true, true);
							}
						}
						else {
							for (var project of projects) {
								$('#select-list-to-task-add-todoist').append('<li><a href="#" rel="'+project.id+'">'+project.name+'</a></li>');
							};
						}
                    }
					);
                    $('input.switcher-checkbox').bootstrapSwitch();
                    $('#todoist-settings').hide();
                    $('#todoist-projects').show();
					$('.btn-group').show();
				}
				catch(e){
					alert ("Ошибка чтения ответа сервера "+e.toString);
				}
			}
			else{
				alert ("Возникли проблемы при получении данных:\n"+xmlHttp.statusText);
			}
		}
	}

	var connectToTodoist = function(token_id) {
		var zapros = {};
		zapros.action='connect';
		zapros.command='["user","projects"]';
		send_todoist(zapros,token_id);
	}

	$(document).on('click', '#todoist_app_settings button.btn-primary', function(e) {
        e.preventDefault();
        var token_id = $('#todoist_app_settings input[name=token_id]').val();
        if (token_id.length > 0 ) {
            localforage.setItem('token_id', token_id, function(err, result) {
                console.log('token_id:', result);
            });
         connectToTodoist(token_id);
        }
    });
	
	$(document).on('click', '#todoist_clear_settings', function() {
        $('#todoist_app_settings input[name=token_id]').val('');
        localforage.removeItem('token_id');
		$('#todoist_ident1, #todoist_ident2').html('');
        $('#todoist-projects').hide();
        $('#todoist-settings').show();
        $('#todoist-save-section').hide();
		$.fancybox.close();
    });
	
    $(document).on('click', 'input[name="task-break"]', function() {
        input_task = 'Перерыв';
        input_time = $(this).val()*1;
        if(task_cost){
            task_cost = 3;
        }
        calculateTime(0);
    });

    String.prototype.hashCode = function(){
        var hash = 0;
        if (this.length == 0) return hash;
        for (var i = 0; i < this.length; i++) {
            var character = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    function send(data)
	{
		console.log('data', data);

        if(data.action == 'setSettings') {
            localforage.getItem('settings', function(err, value) {
                if (value == null) {
                    value = {};
                    console.log('empty');
                }
                value[data.name] = data.value;
                console.log(value);

                localforage.setItem('settings', value, function(err, result) {
                    console.log('name', data.name);
                    console.log('result[data.name]', result[data.name]);
                    $('input[data-set-name="'+data.name+'"]').val(timeFormat(result[data.name]));
                });
            });
        }
        else if(data.action == 'getSettings'){
            console.log('getSettings');

            localforage.getItem('settings', function(err, value) {
                console.log('value', value);
                if (value == null) {
                    value = {};
                }

                $.each(value, function(key, val){
                    console.log('get key', key);
                    console.log('get val', val);

                    if(key == 'task_cost' || key == 'task_break' || key == 'current_time' || key == 'to_time'){
                        eval(key+'='+val);
                        $('[name="'+key+'_deff"]').val(timeFormat(val));

                        if(task_cost){
                            $('#task-cost-div').parent().slideDown(300);
                        }

                        if(task_break && time_period == 'hours'){
                            $('#task-break-div').parent().slideDown(300);
                        } else {
						     $('#task-break-div').parent().slideUp(300);
                        }
						if(time_period == 'hours'){
                           	$('#time_const_div').parent().slideDown(300);
                        } else {
						   $('#time_const_div').parent().slideUp(300);
                        }
                    }

                    if(key == 'task_cost' || key == 'task_break'){
                        if(val == '1'){
                            $('[data-set-name="'+key+'"]').addClass('active');
                        }
                        if(val == '0'){
                            $('[data-set-name="'+key+'"]').removeClass('active');
                        }
                    }

                    if(key == 'background'){
                        $('body').attr('class', val);
                        $('[data-bg="'+val+'"]').addClass('active');
                    }

                    if(key == 'style'){
                        $('#style').attr('href', 'css/css_'+val+'.css');
                        $('[data-style="'+val+'"]').addClass('active');
                    }
                });

                all_time_deff = to_time - current_time;
                calculateTime(1);
            });

            localforage.getItem('favorites', function(err, value) {
                console.log('favs', Object.keys(value).length);
                if (value == null || Object.keys(value).length < 1) {
                    value = {};
                }
                else {
                    $('#task-izb-section').html('<p align="center">ПОВТОРЯЮЩИЕСЯ ЗАДАЧИ:</p><br /><div class="fav-wrapper"></div>');
                    $('#list-izb-task').html('');

                    $.each(value, function(key, val){
                        var cost_str = (val.cost > 0)? ' ['+val.cost+'] ':' ';
                        var html1 = '<div id="task-izb-'+key+'">'+val.task+' ('+val.time+')'+cost_str+'<span class="dell-save-task glyphicon glyphicon-remove" aria-hidden="true" title="Удалить задачу из избранных" data-id="'+key+'"></span></div>';
                        var html2 = '<li><a data-id="'+key+'" rel="'+val.task+'|'+val.time+'|'+val.cost+'">'+val.task+' ('+val.time+')'+cost_str+'</a></div>';
                        $('#task-izb-section .fav-wrapper').prepend(html1);
                        $('#list-izb-task').append(html2);
                    });
                }
            });
			localforage.getItem('projects', function(err, value) {
                console.log('projects loaded', value);
                if (value != null && Object.keys(value).length > 0) {
                    var data = {};
                    data.action = 'todoist-set-view-list';
                    data.projects = value;
                    send(data);
                }
            });
			localforage.getItem('token_id', function(err, token_id) {
                if (token_id!= null) {
                    $('#todoist_app_settings input[name=token_id]').val(token_id);
					connectToTodoist(token_id);                    
                }
            });
        }
        else if(data.action == 'addTaskIzb'){
            localforage.getItem('favorites', function(err, value) {
                if (value == null || Object.keys(value).length < 1) {
                    value = {};
                    $('#task-izb-section').html('<p align="center">ПОВТОРЯЮЩИЕСЯ ЗАДАЧИ:</p><br /><div class="fav-wrapper"></div>');
                }
                var hash = Math.abs(data.task.hashCode());
                value[hash] = data;
                console.log(value);

                localforage.setItem('favorites', value, function(err, result) {
                    console.log('hash', hash);
                    console.log('result[hash]', result[hash]);

                    var cost_str = (data.cost > 0)? ' ['+data.cost+'] ':' ';
                    var html1 = '<div id="task-izb-'+hash+'">'+data.task+' ('+data.time+')'+cost_str+'<span class="dell-save-task glyphicon glyphicon-remove" aria-hidden="true" title="Удалить задачу из избранных" data-id="'+hash+'"></span></div>';
                    var html2 = '<li><a data-id="'+hash+'" rel="'+data.task+'|'+data.time+'|'+data.cost+'">'+data.task+' ('+data.time+')'+cost_str+'</a></div>';
                    $('#task-izb-section .fav-wrapper').prepend(html1);
                    $('#list-izb-task').append(html2);
                    applyes();
                });
            });
        }
        else if(data.action == 'deleteTask'){
            localforage.getItem('favorites', function(err, value) {
                if (value == null || Object.keys(value).length < 1) {
                    value = {};
                }
                else {
                    delete value[data.id];

                    if (Object.keys(value).length < 1) {
                        $('#task-izb-section').html('<p align="center">ПОВТОРЯЮЩИЕСЯ ЗАДАЧИ:</p><br />Задачи отсутствуют.');
                    }
                    else {
                        $('#task-izb-section').html('<p align="center">ПОВТОРЯЮЩИЕСЯ ЗАДАЧИ:</p><br /><div class="fav-wrapper"></div>');
                    }

                    localforage.setItem('favorites', value, function(err, result) {
                        console.log('task delete result', result);
                        $('#list-izb-task').html('');

                        $.each(result, function(key,val){
                            var cost_str = (val.cost > 0)? ' ['+val.cost+'] ':' ';
                            var html1 = '<div id="task-izb-'+key+'">'+val.task+' ('+val.time+')'+cost_str+'<span class="dell-save-task glyphicon glyphicon-remove" aria-hidden="true" title="Удалить задачу из избранных" data-id="'+key+'"></span></div>';
                            var html2 = '<li><a data-id="'+key+'" rel="'+val.task+'|'+val.time+'|'+val.cost+'">'+val.task+' ('+val.time+')'+cost_str+'</a></div>';
                            $('#task-izb-section .fav-wrapper').prepend(html1);
                            $('#list-izb-task').append(html2);
                        });
                    });
                }
            });
        }else if(data.action == 'todoist-set-view-list' && data.projects.length > 0){
            $('#select-list-to-task-add-todoist').html('');
            $.each(data.projects, function(key,val){
                $('#select-list-to-task-add-todoist').append('<li><a href="#" rel="'+val.id+'">'+val.name+'</a></li>');
            });
            localforage.setItem('projects', data.projects, function(err, result) {
                console.log('projects saved', result);
            });
        }
		else if(data.action == 'add-tasks-todoist'){
			if (data.tasks.length>0){
				var zapros = {};
				zapros.action='add-tasks';
				zapros.project_id=data.project_id;
				zapros.tasks=data.tasks;
				var token_id = $('#todoist_app_settings input[name=token_id]').val();
				send_todoist(zapros,token_id);
			}
			else {
				alert("Необходимо сначала заполнить список задач.");
			}
		}
		return false;
	}

    // выбор задачи из списка
    $(document).on('click', '#list-izb-task > li > a', function(){

        var arr = $(this).attr('rel').split('|');
        input_task = arr[0];
        input_time = 1*arr[1];

        if(arr[2] > 0){

            if(task_cost){
                task_cost = arr[2];
            }

        } else {

            if(task_cost){
                $('input[name="task"]').val(arr[0]);
                $('input[name="inputTime"]').val(arr[1]).trigger('click');
                $('input.cost1').trigger('focus');
                return false;
            }
        }

        calculateTime(1);
        applyes();
        return false;
    });

    // удаление задачи из избранных
    $(document).on('click', '.dell-save-task', function(){
        var data = {};
        data.action = 'deleteTask';
        data.id = $(this).attr('data-id');
        send(data);
    });
	
	
	$(document).on('click', '.menu-operation > li > a', function () {

        select_task_log = $('#' + $(this).attr('rel'));
        var action = $(this).attr('data-action');
        var value = select_task_log.find('[name="task-log"]').val();

        if (action == 'addTaskIzb') {
            var data = {};
            data.action = 'addTaskIzb';
            data.task = value;
            data.time = select_task_log.find('.task-log-time').data('time-value');
            data.cost = (select_task_log.find('.task-log-cost').length) ? select_task_log.find('.task-log-cost').html() * 1 : 0;
            send(data);
        }

        if (action == 'addTaskInput') {
            $('input[name="task"]').val(value);
            $('input[name="inputTime"]').trigger('focus');
            applyes();
        }

        if (action == 'abortTask') {

            if (time_period != select_task_log.find('.task-log-time').attr('data-time-period')) {
                alert('Задачу можно удалить только для выбранного при ее создании планирования!');
                return false;
            }

            current_time = current_time - select_task_log.find('.task-log-time').data('time-value') * 1;
            input_time = 0;
            var task_id = select_task_log.attr('id');
            var task_cost = select_task_log.find('span.task-log-cost').html() * 1;
            if ($('#progress-' + task_id).length) {

                $('.progress').attr('class', 'progress');
                var percent = Math.floor(100 * (select_task_log.find('.task-log-time').data('time-value') * 1) / all_time_deff);
                (function () {
                    if (percent >= 0) {
                        percent -= 5;
                        if (percent >= 2) {
                            $('#progress-' + task_id).css({ 'width': percent + '%' }).html(percent + '%');
                        } else {
                            $('#progress-' + task_id).css({ 'width': percent + '%' }).html('');
                        }
                        setTimeout(arguments.callee, 100);
                    } else {
                        $('#progress-' + task_id).remove();
                        if (!$('div.progress').find('.progress-bar').length) $('div.progress').hide();
                    }
                })();

                if (log_itog[task_cost][task_id]['percent']) {
                    log_itog[task_cost][task_id]['percent'] = 0;
                    log_itog.forEach(itogTasks);
                }
            }

            if (time_period == 'days') {
                fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() - (select_task_log.find('.task-log-time').data('time-value') * 1), 0, 0, 0, 0);
            }
            if (time_period == 'months') {
                fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - (select_task_log.find('.task-log-time').data('time-value') * 1), fromDate.getDate(), 0, 0, 0, 0);
            }
            if (time_period == 'years') {
                fromDate = new Date(fromDate.getFullYear() - (select_task_log.find('.task-log-time').data('time-value') * 1), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0, 0);
            }

            calculateTime(1);
            select_task_log.slideUp(400, function () {
                select_task_log.remove();
                if (!$('article.task-log').length) {
                    $('#todoist-save-section, #log-itog').slideUp(500);
                }
            })


        }

        return false;
    });
   
    $(document).on('dblclick', '[name="task-log"]', function () {
        $('input[name="task"]').val($(this).val());
        $('input[name="inputTime"]').val($(this).parents('.task-log').find('.task-log-time').data('time-value'));
        $('input[name="inputTime"]').trigger('focus');
        applyes();
    });

    $(document).on('change', 'input.time_deff', function(){

        var data = {};
        data.action = 'setSettings';
        data.name = $(this).attr('data-set-name');
        data.value = timeToMinutes($(this).val());
        send(data);
    });

    $(document).on('click', 'a.set-curent-time-10-min', function(){
        date = new Date();
        current_time = date.getHours()*60 + date.getMinutes()+10;
        all_time_deff = to_time - current_time;
        calculateTime(1);
        $('.ui-timepicker-close').trigger('click');
        return false;
    });
	// выбор проекта todoist для сохранения в него созданных задач
    $(document).on('click', '#select-list-to-task-add-todoist > li > a', function(){
        var data = {};
        var tasks = [];
        var i = 0;

        $('article.task-log').each(function(){
            var o = $(this);
            var task = {};
            task.title = o.find('input[name="task-log"]').val()+' ('+o.find('span.task-log-time').html()+') '+o.find('span.task-log-period').html();
            task.title += (o.find('span.task-log-cost').length)? ' ['+o.find('span.task-log-cost').html()+']':'';
            task.priority=(o.find('span.task-log-cost').length)? o.find('span.task-log-cost').html():'';
			task.time_period=o.find('span.task-log-time').attr('data-time-period');
			task.start_date=o.attr('data-task-time');
			if (task.time_period=="hours"){
				task.date=$('#current_date').val();
			}
			//alert (task.start_date);
            tasks[i] = task;
            i++;
        });

        data.action = 'add-tasks-todoist';
        data.project_id = $(this).attr('rel');
        data.tasks = tasks;
        send(data);

        return false;
    });
    send({'action':'getSettings'});

    $('.fancybox').fancybox({
        padding     : 20,
        margin      : [20, 60, 20, 60], // Increase left/right margin
        width: 1000,
        height: 1000,
        afterClose: function(){

        },
        afterLoad: function(){

            if($(this.element).attr('class') == 'fancybox task-izb-a'){
               $('.fancybox-skin').addClass('izbr');
            } else {
               $('.fancybox-skin').attr('class', 'fancybox-skin');
            }
        }
    });

    $('.dropdown-toggle').dropdown();

    $("input.switcher-checkbox").bootstrapSwitch();
	
	
	$(document).on('switchChange.bootstrapSwitch', '#todoist-projects-table input.switcher-checkbox', function(event, state) {
        var data = {};
        var projects = [];
        var i = 0;

        $('#todoist-projects-table input.switcher-checkbox').each(function() {
            if ($(this).is(':checked')) {
                projects[i] = {'id': $(this).attr('data-list-id'), 'name': $(this).attr('data-list-title')};
                i++;
            }
        });

        data.action = 'todoist-set-view-list';
        data.projects = projects;

        send(data);
    });
});

function alert(message){
    if(!$('#modal').length){
        $('body').append('<div style="display: none;"><a data-trigger="show-modal" href="#modal">Alert</a><div id="modal"></div></div>');
    }
    message = message.replace(/\/r\/n/, '<br />');
    $('#modal').html('<p>'+message+'</p><div style="text-align: center; margin-top: 30px;"><button type="button" class="btn btn-default" data-trigger="close">Ок</button></div>');
    $('a[data-trigger="show-modal"]').fancybox({
        padding     : 30,
        margin      : [20, 60, 20, 60], // Increase left/right margin
        width: 1000,
        height: 1000,
        afterClose: function(){
        },
        afterLoad: function(){
            $('.fancybox-skin').addClass('alert');
        }
    });
    $('a[data-trigger="show-modal"]').trigger('click');
    $('button[data-trigger="close"]').trigger('focus');
    $('button[data-trigger="close"]').bind('click', function (){
    $('.fancybox-close').trigger('click');
    });
}

function confirm(message, calback){
    if(!$('#modal').length){
        $('body').append('<div style="display: none;"><a data-trigger="show-modal" href="#modal">Alert</a><div id="modal"></div></div>');
    }
    message = message.replace(/\/r\/n/, '<br />');
    $('#modal').html('<p>'+message+'</p><div style="text-align: center; margin-top: 30px;"><button type="button" class="btn btn-default confirm-button" data-trigger="confirm-yes">Да</button>&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default" data-trigger="confirm-no">Нет</button></div>');
    $('a[data-trigger="show-modal"]').fancybox({
        padding     : 30,
        margin      : [20, 60, 20, 60], // Increase left/right margin
        width: 1000,
        height: 1000,
        afterClose: function(){
        },
        afterLoad: function(){
            $('.fancybox-skin').addClass('alert');
        }
    });
    $('a[data-trigger="show-modal"]').trigger('click');
    $('button[data-trigger="confirm-no"]').bind('click', function (){
        $('.fancybox-close').trigger('click');
    });
    $('button[data-trigger="confirm-yes"]').bind('click', function(){
        calback();
        $('.fancybox-close').trigger('click');
    }).trigger('focus');
}

function applyes(){
    if(!$('#applyes').length){
        $('body').append('<div id="applyes" style="display: none;"></div>');
    }
    $('#applyes').css({'top': ($(window).height()/3)+'px'}).show().trigger('click').fadeOut(2000);
}

$(document).ajaxStart(function(event){
    $('body').css({'cursor': 'wait'});
});

$(document).ajaxStop(function(event){
    $('body').css({'cursor': 'default'});
});