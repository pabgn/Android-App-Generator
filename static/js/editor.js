var editor = {
	dragging:false,
	layoutSelected:'elements',
	count:0,
	empty:true,
	elements:{},
	initDraggable: function(){
		$('.object').draggable({  
			opacity: 0.7, 
			helper: 'clone', 
			revert:true,  
		});	
		$('.object').bind('drag', function(ev, ui){
			editor.hoverDetectors();
			editor.dragMonitor($(ui.helper), $(this), false);
			editor.showLayouts();
		});
		$('.object').bind('dragstop', function(ev, ui){
			editor.dragMonitor($(ui.helper), $(this), true);
		});
	},
	dragMonitor: function(object, original, stop){
		editor.dragging = true;
		if (stop) {
			editor.count++;
			$('#'+editor.layoutSelected).append(Objects[$(original).attr('id')]['HTML']);
			//Save new element
			elements['e'+editor.count]=Objects[$(original).attr('id')];
			if (editor.empty) {
				$('#elements_in_use ul').html('<li>' + Objects[$(original).attr('id')]['name'] + '</li>');
				editor.empty = false;
			} else {
				$('#elements_in_use ul').append('<li>' + Objects[$(original).attr('id')]['name'] + '</li>');
			}
			//
			$('#'+editor.layoutSelected).css('background-color', '');
			editor.dragging = false;
		}
	},
	showLayouts:function(){
			$('.layout').css('border', '2px dotted white');			
			$('.layout').css('height', '40px');			
	},
	hideLayouts:function(){
		$('.layout').css('border', '');			
		$('.layout').css('height', '100%');				
	},
	hoverDetectors: function(){
		//Main Layout (elements)
		$('#elements').hover(function() {
				$('#console').html('Inside Elements');
		 		editor.layoutSelected = 'elements';
				$(this).css('background-color', '#515151');	
		}, function() {
				$('#console').html('');
				$(this).css('background-color', '');			
		});
		//Layouts:
		$('.layout').hover(function(){
				$('#console').html('Inside Layout');
				editor.layoutSelected=$(this).attr('id');
				$(this).css('background-color', '#515151');
			}, function(){
				$('#console').html('');
				$(this).css('background-color', '');
			}
		);
	},	
}