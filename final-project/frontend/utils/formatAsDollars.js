export function formatAsDollars(number) {
  // Check if the input is a number
  if (typeof number !== 'number') {
    return 'Invalid input'
  }

  // Convert the number to a string with two decimal places and add a dollar sign
  return '$' + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
