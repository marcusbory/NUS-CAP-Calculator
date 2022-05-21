const gradeOptions = [
  { label: "A+", value: { letter: "A+", value: 5.0 } },
  { label: "A", value: { letter: "A", value: 5.0 } },
  { label: "A-", value: { letter: "A-", value: 4.5 } },
  { label: "B+", value: { letter: "B+", value: 4.0 } },
  { label: "B", value: { letter: "B", value: 3.5 } },
  { label: "B-", value: { letter: "B-", value: 3.0 } },
  { label: "C+", value: { letter: "C+", value: 2.5 } },
  { label: "C", value: { letter: "C", value: 2.0 } },
  { label: "D+", value: { letter: "D+", value: 1.5 } },
  { label: "D", value: { letter: "D", value: 1.0 } },
  { label: "F", value: { letter: "F", value: 0.0 } },
  { label: "S", value: { letter: "S", value: 0.0 } },
  { label: "U", value: { letter: "U", value: 0.0 } },
]

let gradeArray = []

const MUTATE_MODULE = 1
const MUTATE_MC = 2
const MUTATE_GRADE = 3

export const createCard = (id) => {
  const card = document.createElement("div")
  card.className = "card mt-2 mb-2"
  card.id = `card-${id}`

  const cardBody = document.createElement("div")
  cardBody.className = "card-body"

  const singleRow = document.createElement("div")
  singleRow.className = "row"

  const moduleFormGroup = document.createElement("div")
  moduleFormGroup.className = "form-group col-5 mb-0 pr-1"
  const module = document.createElement("input")
  module.required = true
  module.id = `module-${id}`
  module.type = "text"
  module.className = "form-control mb-0"
  module.placeholder = "Module Name"
  moduleFormGroup.appendChild(module)

  const MCFormGroup = document.createElement("div")
  MCFormGroup.className = "form-group col-3 mb-0 pl-1 pr-1"
  const MC = document.createElement("input")
  MC.required = true
  MC.id = `MC-${id}`
  MC.type = "number"
  MC.min = "1"
  MC.max = "40"
  MC.step = "1"
  MC.className = "form-control mb-0"
  MC.placeholder = "MCs"
  MCFormGroup.appendChild(MC)

  const gradeFormGroup = document.createElement("div")
  gradeFormGroup.className = "form-group col-3 mb-0 pl-1 pr-2"
  const grade = document.createElement("select")
  grade.required = true
  grade.id = `grade-${id}`
  grade.className = "form-control mb-0"
  gradeOptions.forEach(opt => {
    const option = document.createElement("option")
    option.innerText = opt.label
    option.value = JSON.stringify(opt.value)
    grade.appendChild(option)
  })
  gradeFormGroup.appendChild(grade)

  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete-btn col-1 pl-0 pr-3"
  deleteBtn.id = `delete-${id}`
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
    id: id,
    moduleName: "",
    MCs: 0,
    gradeValue: {
      letter: "A+",
      value: 5.0
    }
  })

  document.getElementById("entries").appendChild(card)
  document.getElementById(`module-${id}`).addEventListener("input", (e) => mutate(MUTATE_MODULE, id, e.target.value))
  document.getElementById(`MC-${id}`).addEventListener("input", (e) => mutate(MUTATE_MC, id, +(e.target.value)))
  document.getElementById(`grade-${id}`).addEventListener("change", (e) => mutate(MUTATE_GRADE, id, JSON.parse(e.target.value)))
  document.getElementById(`delete-${id}`).addEventListener("click", (e) => deleteMod(id))
}

const mutate = (type, id, newValue) => {
  const currentMod = gradeArray.find(mod => mod.id === id)
  const currentModIndex = gradeArray.findIndex(mod => mod.id === id)
  switch (type) {
    case MUTATE_MODULE:
      currentMod.moduleName = newValue
      break
    case MUTATE_MC:
      currentMod.MCs = newValue
      break
    case MUTATE_GRADE:
      currentMod.gradeValue = newValue
      break
    default:
      break
  }
  gradeArray[currentModIndex] = currentMod
}

const deleteMod = (id) => {
  gradeArray = gradeArray.filter(mod => mod.id !== id)
  const removedModuleCard = document.getElementById(`card-${id}`)
  document.getElementById("entries").removeChild(removedModuleCard)
}

export const calculateCAP = () => {
  let totalMCs = 0
  let totalGrade = 0

  for (const mod of gradeArray) {
    if (mod.gradeValue.letter !== "S" && mod.gradeValue.letter !== "U") {
      totalMCs += +(mod.MCs)
      totalGrade += (+(mod.gradeValue.value) * +(mod.MCs))
    }
  }

  if (totalMCs === 0 && totalGrade === 0) {
    document.getElementById("cap").innerText = 0
  } else {
    document.getElementById("cap").innerText = +(totalGrade / totalMCs).toFixed(2)
  }
}

export const calculateMC = () => {
  let MCsTaken = 0

  // F grade contributes to MCs taken (but not grade)
  // S contributes, but not U
  for (const mod of gradeArray) {
    if (mod.gradeValue.letter !== "U") {
      MCsTaken += +(mod.MCs)
    }
  }

  document.getElementById("mc-taken").innerText = MCsTaken
}