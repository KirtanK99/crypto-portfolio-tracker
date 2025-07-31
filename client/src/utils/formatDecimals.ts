export function toRawBalance(amount: number | string, decimals: number): string {
  const [whole, fractional = ''] = amount.toString().split('.');
  const paddedFraction = fractional.padEnd(decimals, '0').slice(0, decimals);
  return `${whole}${paddedFraction}`.replace(/^0+/, '') || '0';
}
