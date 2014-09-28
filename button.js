$('document').ready(function() {
	require(['composer', 'composer/controls'], function(composer, controls) {
		composer.addButton('fa fa-eyedropper', function(textarea, selectionStart, selectionEnd) {
			$('.fa-eyedropper').ColorPicker({
				onShow: function (el) {
					$(el).fadeIn(500);
					console.log(selectionEnd);
					controls.updateTextareaSelection(textarea, selectionStart, selectionEnd);
					return false;
				},
				onHide: function (el) {
					$(el).fadeOut(500);
					return false;
				},
				onSubmit: function (hsb, hex, rgb, el) {
					$(el).ColorPickerHide();
					if(selectionStart === selectionEnd){
						controls.insertIntoTextarea(textarea, '%(#'+hex+')[Insert Text Here]');
						controls.updateTextareaSelection(textarea, selectionStart + 11, selectionEnd + 27);
					} else {
						controls.wrapSelectionInTextareaWith(textarea, '%(#'+hex+')[',']');
						controls.updateTextareaSelection(textarea, selectionStart + 9, selectionEnd + 1);
					}
				}
			});
			/*console.log(selectionStart);
			console.log(selectionEnd);
			if(selectionStart === selectionEnd){
				controls.insertIntoTextarea(textarea, '%(#color)[Insert Text Here]');
				controls.updateTextareaSelection(textarea, selectionStart + 11, selectionEnd + 27);
			} else {
				controls.wrapSelectionInTextareaWith(textarea, '%(#color)[',']');
				controls.updateTextareaSelection(textarea, selectionStart + 9, selectionEnd + 1);
			}*/
		});
	});
});