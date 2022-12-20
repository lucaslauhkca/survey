"use strict";

$( document ).ready(function() {
    console.log("ready!");
    
    //create or remote survey questions
    $('#addTextQ').click(function () {
        let qNo = $('.qText').length + 1;
        $('#questionArea').append('<div class="row mb-3 qText cq tq"><label for="text' + qNo + '" class="col-sm-2 col-form-label">Question:</label><div class="col-sm-10"><input type="text" class="form-control" id="text' + qNo + '" required name="qText" value=""><input type="hidden" class="form-control" name="qType" value="text"></div><div class="col-md-12"><p class="qRemove btn btn-danger"><i class="fa-solid fa-xmark"></i> Remove</p></div>');
    })

    $('#addMCQ').click(function () {
        let qNo = $('.qText').length + 1;
        let oNo = $('.q' + qNo + 'Option').length + 1;
        $('#questionArea').append('<div class="row mb-3 qText cq rq"><label for="mc' + qNo + '" class="col-sm-2 col-form-label">Question:</label><div class="col-sm-10"><input type="text" class="form-control" id="mc' + qNo + '" required name="qText" value=""><input type="hidden" class="form-control" name="qType" value="mc"><p class="addOption obtn btn btn-primary"><i class="fa-solid fa-circle-plus"></i></p></div><div class="row mb-3 mx-0 px-0"><div class="row mx-0 px-0"><label for="qOption' + (qNo-1) + '" class="col-sm-2 col-form-label">Option:</label><div class="col-sm-10 q' + qNo + 'Option qOption"> <input type="text" class="form-control" id="qOption-' + oNo + '" required name="qOption' + (qNo-1) + '" value=""><p class="removeOption obtn btn btn-warning"><i class="fa-solid fa-circle-minus "></i></p></div></div></div><div class="col-md-12"><p class="qRemove btn btn-danger"><i class="fa-solid fa-xmark"></i> Remove</p></div>');
    })

    $('#addTFQ').click(function () {
        let qNo = $('.qText').length + 1;
        let oNo = $('.q' + qNo + 'Option').length + 1;
        $('#questionArea').append('<div class= "row mb-3 qText cq tfq" ><label for="tf' + qNo + '" class="col-sm-2 col-form-label">Question:</label><div class="col-sm-10"><input type="text" class="form-control" id="tf' + qNo + '" required name="qText" value=""><input type="hidden" class="form-control" name="qType" value="tf"></div><div class="row mb-3 mx-0 px-0"><div class="row mx-0 px-0"><label for="qOption' + (qNo-1) + '" class="col-sm-2 col-form-label">Option:</label><div class="col-sm-10 q' + qNo + 'Option qOption"><input type="text" class="form-control" id="qOption-1" required name="qOption' + (qNo-1) + '" value="True" readonly></div></div><div class="row mx-0 px-0"><label for="qOption' + (qNo-1) + '" class="col-sm-2 col-form-label">Option:</label><div class="col-sm-10 q' + qNo + 'Option qOption"><input type="text" class="form-control" id="qOption-2" required name="qOption' + (qNo-1) + '" value="False" readonly></div></div></div><div class="col-md-12"><p class="qRemove btn btn-danger"><i class="fa-solid fa-xmark"></i> Remove</p></div>');
    })

    $('body').on('click', '.qRemove', function () {
        let target = this.parentNode.parentNode;
        target.remove();
        updateQuestion();
    })
        
    $('body').on('click', '.removeOption', function () { 
        let target = this.parentNode.parentNode;
        target.remove();
    })

    $('body').on('click', '.addOption',function () { 
        let qIndex = $(this).closest('.qText').index();
        let oNo = $('.q' + (qIndex+1) + 'Option').length;

        let target = $(this).parents('div').next(".row.mb-3.mx-0.px-0");
        $(target).append('<div class="row mx-0 px-0"><label for="qOption' + qIndex + '" class="col-sm-2 col-form-label">Option:</label><div class="col-sm-10 q' + (qIndex+1) + 'Option qOption"> <input type="text" class="form-control" id="qOption-' + (oNo+1) + '" required name="qOption' + qIndex + '" value=""><p class="removeOption obtn btn btn-warning"><i class="fa-solid fa-circle-minus "></i></p></div>');
    })

    $('#updateButton').click(function () { 
        updateQuestion();
    })

    function updateQuestion() {
        let rq = $('.rq');
        for (let i = 0; i < rq.length; i++){
            let inputs = rq[i].querySelectorAll('.qOption input');
            jQuery.each(inputs, function () {
                let qIndex = $(this).closest('.qText').index();
                $(this).attr('name', 'qOption' + qIndex);
            })
        }
        let tfq = $('.tfq');
        for (let i = 0; i < tfq.length; i++){
            let inputs = tfq[i].querySelectorAll('.qOption input');
            jQuery.each(inputs, function () {
                let qIndex = $(this).closest('.qText').index();
                $(this).attr('name', 'qOption' + qIndex);
            })
        }
    }

    //delete survey
    $('a.delete').on('click', function(event){
        if(!confirm('Confirm to Delete?'))
        {
          event.preventDefault();
        }       
    });

    //user register form validation
    $('#submitButton').on('click',function () {
        if($('#registerPassword').val() != $('#confirmPassword').val())
        {
          $('#confirmPasswordMessage').html('Passwords are not the same');
          return false;
        }
    });
    
     $('#confirmPassword').on('input',function () {
        if($('#registerPassword').val() != $('#confirmPassword').val())
        {
          $('#confirmPasswordMessage').html('Confirm password does not match!');
        }
        else $('#confirmPasswordMessage').html('<br>');
     });

     $('#registerPassword').on('input',function () {
        if($('#registerPassword').val() != $('#confirmPassword').val())
        {
          $('#confirmPasswordMessage').html('Confirm password does not match!');
        }
        else $('#confirmPasswordMessage').html('<br>');
     });

     $('#startDate').on('change', function(){
        const startDate = $('#startDate').val();
        console.log(startDate);
        $('#endDate').attr({min: startDate});
     })
    
    //submit survey response
    $('#btnResponse').on('click', function (event) {
        //console.log($('.bootstrapForm')[0].checkValidity())
        if ($('.bootstrapForm')[0].checkValidity()) { 
            alert('Great! Your data was sent successfully.Thanks!');
        }  
    });

    //report function
    $('#pdf').on('click', function () {
        let content = document.getElementById('report');
        let options = {
            margin:       0.1,
            filename:     'report.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { dpi: 300, scale: 1 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf(content, options);
    });

    if ($('#csv').length != 0) {
        let id = $('#csv').attr('data');
        console.log(id)
        $.ajax({
            method: 'GET',
            url: '/stat/viewstat/csv/' + id
        })
            .done(function (data) {
                //console.log(data)
                let csvmaker = function (csv) {
                    let csvR = [];
                    csvR.push(csv.SurveyTitle + '\nTotal Response: ' + csv.Answer[0].length);
                    let value = [];
                    for (let ii = 0; ii < csv.Questions.length; ii++) {
                        value.push('Question ' + (ii + 1) + ': ' + csv.Questions[ii]);
                        value.push(csv.Answer[ii] + '\n');
                        value.join(',');
                    }
                    csvR.push(value.join('\n'));
                    return csvR.join('\n\n')
                }
        
                let csvdata = csvmaker(data);
                //console.log(csvdata)
                $('#csv').attr('href', 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvdata));
                $('#csv').attr('download', 'report.csv');
            });
    }
});