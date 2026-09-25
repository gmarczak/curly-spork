"""Podpis webhooków Medusa → agenci: HMAC-SHA256 z nagłówka `x-signature` = "t=<unix>,v1=<hex>"."""

import hashlib
import hmac
import time


def sign(body: bytes, secret: str, timestamp: int | None = None) -> str:
    ts = int(time.time()) if timestamp is None else timestamp
    mac = hmac.new(secret.encode(), f"{ts}.".encode() + body, hashlib.sha256).hexdigest()
    return f"t={ts},v1={mac}"


def verify(body: bytes, header: str | None, secret: str, tolerance_s: int = 300, now: int | None = None) -> bool:
    if not secret or not header:
        return False
    try:
        parts = dict(p.split("=", 1) for p in header.split(","))
        ts = int(parts["t"])
        received = parts["v1"]
    except (ValueError, KeyError):
        return False
    current = int(time.time()) if now is None else now
    if abs(current - ts) > tolerance_s:
        return False
    expected = sign(body, secret, ts).split("v1=", 1)[1]
    return hmac.compare_digest(expected, received)
