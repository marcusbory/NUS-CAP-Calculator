let gradeArray = []

const gradeOptions = [
  {label: "A+", value: "5.0"}, 
  {label: "A", value: "5.0"}, 
  {label: "A-", value: "4.5"},
  {label: "B+", value: "4.0"},
  {label: "B", value: "3.5"},
  {label: "B-", value: "3.0"},
  {label: "C+", value: "2.5"},
  {label: "C", value: "2.0"},
  {label: "D+", value: "1.5"},
  {label: "D", value: "1.0"},
  {label: "F", value: "0.0"},
  {label: "S", value: "0.0"}, 
  {label: "U", value: "0.0"}
]

const createCard = () => {
  // const modIndex = gradeArray.length
  
  const card = document.createElement("div")
  card.className = "card mt-2 mb-2"

  const cardBody = document.createElement("div")
  cardBody.className = "card-body"
  
  const singleRow = document.createElement("div")
  singleRow.className = "row"
  
  const moduleFormGroup = document.createElement("div")
  moduleFormGroup.className = "form-group col-5 mb-0 pr-1"
  const module = document.createElement("input")
  module.required = true
  // module.id = `mod${modIndex}`
  module.type = "text"
  module.className = "form-control mb-0"
  module.placeholder = "Module Name"
  moduleFormGroup.appendChild(module)
  
  const MCFormGroup = document.createElement("div")
  MCFormGroup.className = "form-group col-3 mb-0 pl-1 pr-1"
  const MC = document.createElement("input")
  MC.required = true
  // MC.id = `mc${modIndex}`
  MC.type = "number"
  MC.className = "form-control mb-0"
  MC.placeholder = "MCs"
  MCFormGroup.appendChild(MC)

  const gradeFormGroup = document.createElement("div")
  gradeFormGroup.className = "form-group col-3 mb-0 pl-1 pr-2"  
  const grade = document.createElement("select")
  grade.required = true
  // grade.id = `grade${modIndex}`
  grade.className = "form-control mb-0"
  gradeOptions.forEach(opt => {
    const option = document.createElement("option")
    option.innerText = opt.label
    grade.appendChild(option)
  })
  gradeFormGroup.appendChild(grade)
  
  const deleteBtn = document.createElement("button")
  // deleteBtn.id = `delete${modIndex}`
  deleteBtn.className = "delete-btn"
  const cross = document.createElement("i")
  cross.className = "fa-solid fa-x"
  deleteBtn.appendChild(cross)

  singleRow.appendChild(moduleFormGroup)
  singleRow.appendChild(MCFormGroup)
  singleRow.appendChild(gradeFormGroup)
  singleRow.appendChild(deleteBtn)
  cardBody.appendChild(singleRow)
  card.appendChild(cardBody)

  gradeArray.push({
    moduleName: "",
    MCs: 0,
    gradeValue: 5.0
  })

  return card
}

const addEvent = () => {
  const newCard = createCard()
  console.log(newCard)
  document.getElementById("entries").appendChild(newCard)
}

document.getElementById("add-entry").addEventListener("click", addEvent)

const handleSubmit = (e) => {
  e.preventDefault()
  let totalMCs = 0
  let totalGrades = 0

  for (let i = 0; i < gradeArray.length; i++) {
    totalMCs += parseInt(document.getElementById(`mc${i}`).value)
  }
  console.log(totalMCs)
}
document.getElementById("entries").addEventListener("submit", (e) => handleSubmit(e))