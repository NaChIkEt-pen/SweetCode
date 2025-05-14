from app import create_app
# Create the app using the factory function
app = create_app()
client = app.client


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)