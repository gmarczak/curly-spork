from fabryka_agents.security import sign, verify

SECRET = "s3cret"
BODY = b'{"id":"evt_1"}'


def test_valid_signature():
    assert verify(BODY, sign(BODY, SECRET, 1000), SECRET, now=1010)


def test_wrong_secret_or_body():
    header = sign(BODY, SECRET, 1000)
    assert not verify(BODY, header, "inny", now=1000)
    assert not verify(b'{"id":"evt_2"}', header, SECRET, now=1000)


def test_expired_and_malformed():
    assert not verify(BODY, sign(BODY, SECRET, 1000), SECRET, tolerance_s=300, now=1400)
    assert not verify(BODY, "garbage", SECRET)
    assert not verify(BODY, None, SECRET)
    assert not verify(BODY, sign(BODY, SECRET), "")
