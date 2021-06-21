**Contoh Script autocomplete Key-Value pair**    

<code>

$(document).bind("keyup.autocomplete",function(){

    $('#id_nim').autocomplete({
        minLength:1,
        select:function(event, ui){

            $('#id_elemen').val(ui.item.id);

        },

        focus: function (event, ui) {
            $('#id_elemen').val(ui.item.id);

        },
        source:function(request, response) {
            $.ajax({
                url: "suatu URL",
                dataType: "json",
                data: {
                    term: request.term,
                },
                success: function (data) {
                    response(data);
                }
            })
        },
    }); 
});
</code>