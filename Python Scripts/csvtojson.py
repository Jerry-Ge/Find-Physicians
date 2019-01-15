import csv, json

csvFilePathGeneral = "OP_DTL_GNRL_PGYR2016_P06292018.csv"
csvFilePathResearch = "OP_DTL_RSRCH_PGYR2016_P06292018.csv"
csvFilePathOwner = "OP_DTL_OWNRSHP_PGYR2016_P06292018.csv"
jsonFilePath = "physicians1.json"

# Read the CSV, add only 3 names, physician profile_id
# AND Addr1, Addr2, City, State, Zip_Code, Country

# Python Disctionary to Store all Data
data = {}
dataArray = []
# Helper Function for parsing each .csv file
def parseFile(csvFilePath) :
	with open(csvFilePath) as csvFile:
		csvReader = csv.DictReader(csvFile)
		# Read through each row of .csv file
		for csvRow in csvReader:
			currPhysician = {}

			# Retrive the data for our wanted colums
			profile_id = csvRow["Physician_Profile_ID"]

			# Ignore empty id physicians
			if profile_id != '':
				first_name = csvRow["Physician_First_Name"].lower()
				last_name = csvRow["Physician_Last_Name"].lower()
				middle_name = csvRow["Physician_Middle_Name"].lower()
				addr_line1 = csvRow["Recipient_Primary_Business_Street_Address_Line1"]
				addr_line2 = csvRow["Recipient_Primary_Business_Street_Address_Line2"]
				addr_city = csvRow["Recipient_City"]
				addr_state = csvRow["Recipient_State"]
				addr_zip = csvRow["Recipient_Zip_Code"]
				addr_country = csvRow["Recipient_Country"]

				# Set the entry for each physician
				currPhysician["id"] = profile_id 
				currPhysician["first_name"] = first_name
				currPhysician["last_name"] = last_name
				currPhysician["middle_name"] = middle_name
				currPhysician["addr_line1"] = addr_line1
				currPhysician["addr_line2"] = addr_line2
				currPhysician["addr_city"] = addr_city
				currPhysician["addr_state"] = addr_state
				currPhysician["addr_zip"] = addr_zip
				currPhysician["country"] = addr_country

				data[profile_id] = currPhysician;

def convertToArray() : 
	for person in data:
		dataArray.append(data[person])

parseFile(csvFilePathGeneral)
parseFile(csvFilePathResearch)
parseFile(csvFilePathOwner)
convertToArray();

# Write date to a JSON file
with open(jsonFilePath, "w") as jsonFile:
	jsonFile.write(json.dumps(dataArray, indent=4))