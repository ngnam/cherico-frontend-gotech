const ACCOUNT_TYPES = [
  {
    id: 'offical',
    text: '公式',
  },
  {
    id: 'normal',
    text: 'ノーマル',
  },
  {
    id: 'certification',
    text: '認定',
  },
]

function getAccountType(accountType) {
  return ACCOUNT_TYPES.find((type) => type.id === accountType)
}

export { ACCOUNT_TYPES, getAccountType }
