from server import app

url = "http://localhost:5000/"
t_data = {"airpressure": 23, "flow": 5, "temp": 10,
          "timestamp": "Fri, 17 Feb 2023 15:22:41 GMT", "unit": 0}


def test():
    # Update data testing depending on flask requests
    with app.test_client() as c:
        response = c.get('/sensors')
        assert response.status_code == 200
