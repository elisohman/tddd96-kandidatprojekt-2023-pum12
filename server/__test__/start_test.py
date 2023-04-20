from server import app

"""
pip install pytest
Run server.py, then in ./server/ run python -m pytest
"""


def test():
    response = app.test_client().get("/data")
    assert response.status_code == 200
