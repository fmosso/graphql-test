package fileUtil;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.amazonaws.services.dynamodbv2.document.Item;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBeanBuilder;

import dynamoDB.ItemBuilder;

public class CSVOperations {

	public static void main(String[] args) throws IllegalStateException, IOException {
		String path = "mockdata/";
		String fileName = "Credential.csv";
		Reader reader = new FileReader( path+fileName);
		CSVReader csvReader = new CSVReader(reader);
		List<String> attributes = new ArrayList<String>(Arrays.asList(csvReader.readNext())) ;
		String primaryKey = attributes.get(0);
		System.out.println(attributes.get(0));
		attributes.remove(0);
		
		List<Item> items = new ArrayList<Item>();  
		csvReader.forEach( line ->   {  
										items.add(new ItemBuilder(primaryKey, line[0] , null).build()); 
			
		});
		System.out.println(items.get(0).get("mail"));

	}

}
