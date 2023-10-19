const list = `
Birth Certificate
Marriage Certificate
Pre-Nuptial Agreement
Divorce Decgree
Adoption Document
Military Discharge 
Green Card / Naturalization Papers
Will
Living Will
Power of Attorney
Letter of Instruction
Trust
`
  .split('\n')
  .map((option) => option.trim())
  .filter((option) => option != '')
  .join(',')

console.log(list)
