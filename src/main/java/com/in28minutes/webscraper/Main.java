package com.in28minutes.webscraper;

import com.in28minutes.webscraper.json.JsonExporter;
import com.in28minutes.webscraper.model.Book;
import com.in28minutes.webscraper.pdf.PdfGenerator;
import com.in28minutes.webscraper.scraper.WebScraper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.List;

/**
 * Application entry point for the In28Minutes Interview Guide Scraper.
 *
 * <p>Execution flow:</p>
 * <ol>
 *   <li>The {@link WebScraper} discovers all interview topics and performs a
 *       multi-level crawl to build a list of {@link Book} data models.</li>
 *   <li>The {@link PdfGenerator} renders each Book as a standalone, styled PDF
 *       file saved to the {@code ./output/} directory.</li>
 * </ol>
 *
 * <p>Usage (after {@code mvn package}):</p>
 * <pre>
 *   java -jar target/webscraper-1.0.0.jar
 * </pre>
 */
public class Main {

    private static final Logger log = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) {
        printBanner();

        log.info("In28Minutes Interview Guide Scraper starting...");
        long startTime = System.currentTimeMillis();

        try {
            // ----------------------------------------------------------------
            // Phase 1 – Scraping
            // ----------------------------------------------------------------
            log.info("Phase 1: Web scraping initiated.");
            WebScraper scraper = new WebScraper();
            List<Book> books = scraper.scrapeAllTopics();

            if (books.isEmpty()) {
                log.warn("Scraping completed but no content was retrieved. " +
                         "Check your network connection and verify the target URL is accessible.");
                return;
            }

            log.info("Phase 1 complete. {} topic(s) scraped successfully:", books.size());
            for (Book book : books) {
                log.info("  • {} → {} section(s)", book.getTopicName(), book.getSections().size());
            }

            // ----------------------------------------------------------------
            // Phase 2 – PDF Generation
            // ----------------------------------------------------------------
            log.info("Phase 2: PDF generation initiated.");
            PdfGenerator pdfGenerator = new PdfGenerator();
            pdfGenerator.generateAllBooks(books);

            // ----------------------------------------------------------------
            // Phase 3 – JSON Export for Website
            // ----------------------------------------------------------------
            log.info("Phase 3: JSON export for React website initiated.");
            JsonExporter jsonExporter = new JsonExporter();
            jsonExporter.exportAllBooks(books);
            log.info("Phase 3 complete. Data written to frontend/public/data/");

            // ----------------------------------------------------------------
            // Summary
            // ----------------------------------------------------------------
            long elapsedSec = (System.currentTimeMillis() - startTime) / 1000;
            File outputDir  = new File("output");

            log.info("=========================================================");
            log.info("  All done!  Elapsed time: {}s", elapsedSec);
            log.info("  Output directory: {}", outputDir.getAbsolutePath());
            if (outputDir.exists()) {
                File[] pdfs = outputDir.listFiles((d, name) -> name.endsWith(".pdf"));
                if (pdfs != null) {
                    log.info("  {} PDF file(s) generated:", pdfs.length);
                    for (File pdf : pdfs) {
                        log.info("    → {} ({} KB)", pdf.getName(), pdf.length() / 1024);
                    }
                }
            }
            log.info("=========================================================");

        } catch (Exception e) {
            log.error("Fatal error during execution: {}", e.getMessage(), e);
            System.exit(1);
        }
    }

    // -------------------------------------------------------------------------
    // Console banner
    // -------------------------------------------------------------------------

    private static void printBanner() {
        System.out.println();
        System.out.println("  ██╗███╗   ██╗██████╗ ██████╗     ███╗   ███╗██╗███╗   ██╗██╗   ██╗████████╗███████╗███████╗");
        System.out.println("  ██║████╗  ██║╚════██╗╚════██╗    ████╗ ████║██║████╗  ██║██║   ██║╚══██╔══╝██╔════╝██╔════╝");
        System.out.println("  ██║██╔██╗ ██║ █████╔╝ █████╔╝    ██╔████╔██║██║██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗");
        System.out.println("  ██║██║╚██╗██║██╔═══╝  ╚═══██╗    ██║╚██╔╝██║██║██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║");
        System.out.println("  ██║██║ ╚████║███████╗██████╔╝    ██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝   ██║   ███████╗███████║");
        System.out.println("  ╚═╝╚═╝  ╚═══╝╚══════╝╚═════╝     ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝");
        System.out.println();
        System.out.println("  Interview Guide Scraper  |  interview.in28minutes.com  |  v1.0.0");
        System.out.println("  ─────────────────────────────────────────────────────────────────");
        System.out.println();
    }
}

