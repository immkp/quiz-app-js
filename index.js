$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (res) {
  let data = res
  let questionWrap = ""
  for (let i = 0; i < data.length; i++) {
    questionWrap += `<div class="Question-wrapper"> <h2 class="quiz-question"> Q${
      i + 1 + ". " + data[i].question
    }<h2>`
    questionWrap += `<div class="options-wrapper">`
    for (let j = 0; j < data[i].options.length; j++) {
      questionWrap += `<div class="option">
                  <label class="labels"><input type="radio" name="${data[i].id}"  value="${data[i].options[j]}">${data[i].options[j]}</label>
              </div>`
    }
    questionWrap += `</div></div>`
  }
  let submitwrapper = $(
    `<input type="submit" id='form-submit'> <button type="reset" class="resetBtn" id="resetBtn">Submit</button>`
  )

  $("#quizApp div").html(questionWrap)
  $("#quizApp").append(submitwrapper)
  let scoreWrap = $(".score-div")
  let scorelabel = $("<div>")
  scorelabel.text("Score :")
  scorelabel.addClass("scorelabel")

  let score = $("<p>")
  score.text("O/5")
  score.addClass("marks")

  scoreWrap.append(scorelabel, score)
  $("#form-submit").click(function (e) {
    e.preventDefault()
    let finalScore = 0
    let getAnswer = $("#quizApp div input[type=radio]:checked")
    console.log(getAnswer)
    if (data) {
      for (let i = 0; i < getAnswer.length; i++) {
        let options = data[getAnswer[i].name - 1]["options"]
        if (
          data[getAnswer[i].name - 1]["answer"] ==
          options.indexOf(getAnswer[i].value) + 1
        ) {
          finalScore++
        }
      }
      score.text(`${finalScore + "/" + data.length}`)
      $("#resetBtn").click()
    }
  })
})

