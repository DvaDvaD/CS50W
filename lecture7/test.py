from prime import is_prime

def test_prime(n, expected):
  if is_prime(n) != expected:
    print(f"ERROR in is_prime({n}), expected {expected}")