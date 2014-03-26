require([
    'jquery', /* $ */
    'jquery.disableWhileLoading'
], function($) {
    var check_box_state;
    $(".activate").click(function() {
        var $self = $(this);
        if ($(this).is(':checked')) {
            check_box_state = 'checked';
        } else {
            check_box_state = 'unchecked';
        }
        $("#content").disableWhileLoading( $.ajax({
            type: 'POST',
            url: 'update_user',
            data: {
                'id': $self.attr('id'),
                'state': check_box_state
            },
            complete: function(msg){
                $.flashMessage('User status updated!')
            }
        })
        );
    });
    $('select.provider_select').change(function(event) {
        selected_user_id = event.target.name;
        provider = $(this).val();
        $("#content").disableWhileLoading( $.ajax({
            type: 'POST',
            url: 'update_user',
            data: {
                'id': selected_user_id,
                'provider': provider
            },
            complete: function(msg){
                $.flashMessage('Provider Updated!')
            }
        })
        );
    });
});