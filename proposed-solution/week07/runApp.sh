#!/bin/bash

echo "Starting application..."

echo "Starting API..."
(cd api/FirewallCracker && dotnet run) &

# Wait a moment for API to initialize
sleep 2

echo "Starting react app..."
(cd front-end && npm run dev) &

# Wait for processes to start
sleep 2

echo ""
echo "Both applications are running."
echo "Press 'q' to quit both applications."

# Wait for user to press 'q'
while true; do
    read -rsn1 input
    if [ "$input" = "q" ] || [ "$input" = "Q" ]; then
        echo "Stopping applications..."
        
        # Get Frontend PID by port
        FRONTEND_PID=$(lsof -ti tcp:5173)
        if [ -n "$FRONTEND_PID" ]; then
            echo "Killing frontend process (PID: $FRONTEND_PID)"
            kill -9 $FRONTEND_PID 2>/dev/null
        else
            echo "Frontend process not found on port 5173"
        fi
        
        # Get API PID by port
        API_PID=$(lsof -ti tcp:7128)
        if [ -n "$API_PID" ]; then
            echo "Killing API process (PID: $API_PID)"
            kill -9 $API_PID 2>/dev/null
        else
            echo "API process not found on port 7128"
        fi
        
        echo "Application stopped."
        break
    fi
done